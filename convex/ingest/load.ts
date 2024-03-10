"use node";

import { v } from "convex/values";
import { internalAction } from "../_generated/server";
import { ConvexKVStore } from "langchain/storage/convex";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { ConvexVectorStore } from "langchain/vectorstores/convex";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { CacheBackedEmbeddings } from "langchain/embeddings/cache_backed";

export const createEmbeddings = internalAction({
  args: {
    storageFileId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    let fileUrl = await ctx.storage.get(args.storageFileId);

    const loader = new PDFLoader(fileUrl ?? "");

    if (!loader) console.log("Failed to create loader");

    const docs = await loader.load();

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const splitDocs = await textSplitter.splitDocuments(docs);

    const embeddings = new CacheBackedEmbeddings({
      underlyingEmbeddings: new OpenAIEmbeddings(),
      documentEmbeddingStore: new ConvexKVStore({ ctx }),
    });

    // Store the embeddings in the convex database
    await ConvexVectorStore.fromDocuments(splitDocs, embeddings, { ctx });
  },
});