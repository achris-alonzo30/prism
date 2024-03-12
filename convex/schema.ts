import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export const fileTypes = v.union(
  v.literal("image"),
  v.literal("csv"),
  v.literal("pdf"),
);

export const roles = v.union(v.literal("admin"), v.literal("member"));

export const messageRole = v.union(v.literal("user"), v.literal("bot"));

export default defineSchema({
  cache: defineTable({
    key: v.string(),
    value: v.any(),
  }).index("byKey", ["key"]),

  documents: defineTable({
    embedding: v.array(v.number()),
    text: v.string(),
    metadata: v.any(),
  }).vectorIndex("byEmbedding", {
    vectorField: "embedding",
    dimensions: 1536,
  }),

  messages: defineTable({
    // Which conversation this message belongs to
    sessionId: v.string(),
    message: v.object({
      // The message create either AI or user
      type: v.string(),
      data: v.object({
        // The content of the message
        content: v.string(),
        role: v.optional(v.string()),
        name: v.optional(v.string()),
        additional_kwargs: v.optional(v.any()),
      })
    })
  }).index("bySessionId", ["sessionId"]),

  files: defineTable({
    name: v.string(),
    orgId: v.string(),
    fileType: fileTypes,
    userId: v.id("users"),
    fileId: v.id("_storage"),
    fileUrl: v.optional(v.string()),
    markedForDeletion: v.optional(v.boolean()),
  })
    .index("by_orgId", ["orgId"])
    .index("by_markedForDeletion", ["markedForDeletion"]),

  users: defineTable({
    tokenIdentifier: v.string(),
    name: v.optional(v.string()),
    orgIds: v.array(
      v.object({
        orgId: v.string(),
        role: roles,
      })
    ),
    profileImage: v.optional(v.string()),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),

  favorites: defineTable({
    orgId: v.string(),
    fileId: v.id("files"),
    userId: v.id("users"),
  }).index("by_userId_orgId_fileId", ["userId", "orgId", "fileId"]),

});