import { getUser } from "./users";
import { fileTypes } from "./schema";
import { Id } from "./_generated/dataModel";
import { ConvexError, v } from "convex/values";
import { MutationCtx, QueryCtx, mutation, query } from "./_generated/server";


// STORAGE FILE UPLOADS
export const generateUploadUrl = mutation(async (ctx) => {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity)
    throw new ConvexError("You must be signed in to perform this action");

  return await ctx.storage.generateUploadUrl();
});

// UTILITY FUNCTIONS
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

async function hasAccess(ctx: QueryCtx | MutationCtx, fileId: Id<"files">) {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) return null;

  const file = await ctx.db.get(fileId);

  if (!file) return null;

  const hasAccess = await orgAccess(file.orgId, identity.tokenIdentifier, ctx);

  if (!hasAccess) return null;

  const user = await ctx.db
    .query("users")
    .withIndex("by_tokenIdentifier", (q) =>
      q.eq("tokenIdentifier", identity.tokenIdentifier)
    )
    .first();

  if (!user) return null;

  return { user, file };
}

// API CONVEX ACTIONS
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
    favorites: v.optional(v.boolean()),
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

    let files = await ctx.db
      .query("files")
      .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
      .collect();

    const query = args.query;

    if (query) {
      return files.filter((file) =>
        file.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (args.favorites) {
      const user = await ctx.db
        .query("users")
        .withIndex("by_tokenIdentifier", (q) =>
          q.eq("tokenIdentifier", identity.tokenIdentifier)
        )
        .first();

      if (!user) return [];

      const favorites = await ctx.db
        .query("favorites")
        .withIndex("by_userId_orgId_fileId", (q) =>
          q.eq("userId", user?._id).eq("orgId", args.orgId)
        )
        .collect();

      files = files.filter((file) =>
        favorites.some((favorite) => favorite.fileId === file._id)
      );
    }

    return files;
  },
});

export const deleteFile = mutation({
  args: { fileId: v.id("files") },
  handler: async (ctx, args) => {
    const access = await hasAccess(ctx, args.fileId);

    if (!access) throw new ConvexError("File not found");

    await ctx.db.delete(access.file._id);
  },
});

export const toggleFavorite = mutation({
  args: { fileId: v.id("files") },
  handler: async (ctx, args) => {
    const access = await hasAccess(ctx, args.fileId);

    if (!access) throw new ConvexError("File not found");

    const favorite = await ctx.db
      .query("favorites")
      .withIndex("by_userId_orgId_fileId", (q) =>
        q
          .eq("userId", access.user._id)
          .eq("orgId", access.file.orgId)
          .eq("fileId", access.file._id)
      )
      .first();

    if (!favorite) {
      await ctx.db.insert("favorites", {
        fileId: access.file._id,
        userId: access.user._id,
        orgId: access.file.orgId,
      });
    } else {
      await ctx.db.delete(favorite._id);
    }
  },
});
