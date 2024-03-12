import { v } from "convex/values";
import { BufferMemory } from "langchain/memory";
import { internalAction } from "./_generated/server";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { ConvexVectorStore } from "langchain/vectorstores/convex";
import { ConvexChatMessageHistory } from "langchain/stores/message/convex";

const OPENAI_MODEL = "gpt-3.5-turbo";

export const answer = internalAction({
  args: {
    sessionId: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const vectorStore = new ConvexVectorStore(new OpenAIEmbeddings(), { ctx });
    const model = new ChatOpenAI({ modelName: OPENAI_MODEL, temperature: 0 });

    const prompt = ChatPromptTemplate.fromTemplate(
      `Important: You are an intelligent chatbot designed to help users by answering questions only on Enterprise services & activities.
      Answer the questions only the document that is provided to you. If the question doesn't come from the document, say that you don't know.
      If context is not empty and the answer cannot be determined from context, say "I cannot determine the answer from context". If you don't know the answer, just say that you don't know, don't try to make up an answer. Do not print your answer starting with "Answer:"

      (You do not need to use these pieces of information if not relevant)

      Current conversation:
      Human: {args.message}
      AI:`
    );

    // Retrieves the chat history from a single conversataion
    const memory = new BufferMemory({
      chatHistory: new ConvexChatMessageHistory({
        sessionId: args.sessionId,
        ctx,
      }),
      memoryKey: `chat_history`,
      inputKey: `question`,
    });

    const chain = ConversationalRetrievalQAChain.fromLLM(
      model,
      vectorStore.asRetriever(),
      {
        memory,
        verbose: true,
      }
    );

    await chain.invoke({ question: args.message, prompt });
  },
});