import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export const fileTypes = v.union(
  v.literal("image"),
  v.literal("csv"),
  v.literal("pdf"),
);

export const roles = v.union(v.literal("admin"), v.literal("member"));

export default defineSchema({
  files: defineTable({
    name: v.string(),
    orgId: v.string(),
    fileType: fileTypes,
    userId: v.id("users"),
    fileId: v.id("_storage"),
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
