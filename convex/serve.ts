import { v } from "convex/values";
import { BufferMemory } from "langchain/memory";
import { internalAction } from "./_generated/server";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { ConvexVectorStore } from "langchain/vectorstores/convex";
import { ConvexChatMessageHistory } from "langchain/stores/message/convex";


export const answer = internalAction({
  args: {
    sessionId: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const vectorStore = new ConvexVectorStore(new OpenAIEmbeddings(), { ctx });
    const model = new ChatOpenAI({ modelName: "gpt-4o-mini" });

    // Retrieves the chat history from a single conversataion
    const memory = new BufferMemory({
      chatHistory: new ConvexChatMessageHistory({
        sessionId: args.sessionId,
        ctx,
      }),
      memoryKey: `chat_history`,
      outputKey: "text",
      returnMessages: true,
    });

    const chain = ConversationalRetrievalQAChain.fromLLM(
      model,
      vectorStore.asRetriever(),
      {
        memory,
        verbose: true,
      }
    );

    await chain.invoke({ question: args.message });
  },
});