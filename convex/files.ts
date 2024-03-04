import { getUser } from "./users";
import { ConvexError, v } from "convex/values";
import { MutationCtx, QueryCtx, mutation, query } from "./_generated/server";
import { fileTypes } from "./schema";

export const generateUploadUrl = mutation(async (ctx) => {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity)
    throw new ConvexError("You must be signed in to perform this action");

  return await ctx.storage.generateUploadUrl();
});

async function orgAccess(
  orgId: string,
  tokenIdentifier: string,
  ctx: QueryCtx | MutationCtx
) {
  const user = await getUser(ctx, tokenIdentifier);

  const hasAccess =
    user.orgIds.includes(orgId) || user.tokenIdentifier.includes(orgId);

  return hasAccess;
}

export const createFile = mutation({
  args: {
    fileName: v.string(),
    orgId: v.string(),
    fileId: v.id("_storage"),
    fileType: fileTypes,
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity)
      throw new ConvexError("You must be signed in to perform this action");

    const hasAccess = await orgAccess(
      args.orgId,
      identity.tokenIdentifier,
      ctx
    );

    if (!hasAccess) {
      throw new ConvexError(
        "You need to be a member of this organization to perform this action."
      );
    }

    await ctx.db.insert("files", {
      name: args.fileName,
      orgId: args.orgId,
      fileId: args.fileId,
      fileType: args.fileType,
    });
  },
});

export const getFiles = query({
  args: {
    orgId: v.string(),
    query: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) return [];

    const hasAccess = await orgAccess(
      args.orgId,
      identity.tokenIdentifier,
      ctx
    );

    if (!hasAccess) return [];

    const files = await ctx.db
      .query("files")
      .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
      .collect();

    const query = args.query;

    if (query) {
      return files.filter((file) =>
        file.name.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      return files;
    }
  },
});

export const deleteFile = mutation({
  args: { fileId: v.id("files") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity)
      throw new ConvexError("You must be signed in to perform this action");

    const file = await ctx.db.get(args.fileId);

    if (!file) throw new ConvexError("File not found");

    const hasAccess = await orgAccess(
      file.orgId,
      identity.tokenIdentifier,
      ctx
    );

    if (!hasAccess) {
      throw new ConvexError(
        "You need to be a member of this organization to perform this action."
      );
    }

    await ctx.db.delete(args.fileId);
  },
});
