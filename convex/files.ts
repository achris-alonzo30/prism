import { ConvexError, v } from "convex/values";
import { QueryCtx, MutationCtx, mutation, query } from "./_generated/server";

export async function isAuthenticated(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity)
    throw new ConvexError("You must be signed in to perform this action");

  return identity;
}

export const createFile = mutation({
  args: { fileName: v.string(), orgId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity)
      throw new ConvexError("You must be signed in to perform this action");

    await ctx.db.insert("files", {
      name: args.fileName,
      orgId: args.orgId,
    });
  },
});

export const getFiles = query({
  args: { orgId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) return [];

    return ctx.db
      .query("files")
      .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
      .collect();
  },
});
