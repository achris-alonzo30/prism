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
async function orgAccess(orgId: string, ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) return null;

  const user = await ctx.db
    .query("users")
    .withIndex("by_tokenIdentifier", (q) =>
      q.eq("tokenIdentifier", identity.tokenIdentifier)
    )
    .first();

  if (!user) return null;

  const hasAccess =
    user.orgIds.some((item) => item.orgId === orgId) || user.tokenIdentifier.includes(orgId);

  if (!hasAccess) return null;

  return { user };
}

async function fileAccess(
  ctx: QueryCtx | MutationCtx,
  fileId: Id<"files">
) {
  const file = await ctx.db.get(fileId);

  if (!file) return null;

  const hasAccess = await orgAccess(file.orgId, ctx);

  if (!hasAccess) return null;

  return { user: hasAccess.user, file };
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
    const hasAccess = await orgAccess(args.orgId, ctx);

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
    deletes: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const hasAccess = await orgAccess(args.orgId, ctx);

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
      const favorites = await ctx.db
        .query("favorites")
        .withIndex("by_userId_orgId_fileId", (q) =>
          q.eq("userId", hasAccess.user._id).eq("orgId", args.orgId)
        )
        .collect();

      files = files.filter((file) =>
        favorites.some((favorite) => favorite.fileId === file._id)
      );
    }

    if (args.deletes) {
      files = files.filter((file) => file.markedForDeletion);
    }

    return files;
  },
});

export const deleteFile = mutation({
  args: { fileId: v.id("files") },
  handler: async (ctx, args) => {
    const access = await fileAccess(ctx, args.fileId);

    if (!access) throw new ConvexError("File not found");

    const admin = access.user.orgIds.find((org) => org.orgId === access.file.orgId)?.role === "admin";

    if (!admin) throw new ConvexError("You must be an admin to perform this action");

    await ctx.db.patch(args.fileId, {
      markedForDeletion: true,
    });
  },
});

export const toggleFavorite = mutation({
  args: { fileId: v.id("files") },
  handler: async (ctx, args) => {
    const access = await fileAccess(ctx, args.fileId);

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

export const getAllFavorite = query({
  args: { orgId: v.string() },
  handler: async (ctx, args) => {
    const hasAccess = await orgAccess(args.orgId, ctx);

    if (!hasAccess) return [];

    const favorites = await ctx.db
      .query("favorites")
      .withIndex("by_userId_orgId_fileId", (q) =>
        q
          .eq("userId", hasAccess.user._id)
          .eq("orgId", args.orgId)
      )
      .collect();

    return favorites;
  },
});
