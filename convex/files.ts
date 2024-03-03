import { ConvexError, v } from "convex/values";
import { MutationCtx, QueryCtx, mutation, query } from "./_generated/server";
import { getUser } from "./users";

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
  args: { fileName: v.string(), orgId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity)
      throw new ConvexError("You must be signed in to perform this action");

    const hasAccess = await orgAccess(args.orgId, identity.tokenIdentifier, ctx);

    if (!hasAccess) {
      throw new ConvexError(
        "You need to be a member of this organization to perform this action."
      );
    }

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

    const hasAccess = await orgAccess(args.orgId, identity.tokenIdentifier, ctx);

    if (!hasAccess) return [];
    
    return ctx.db
      .query("files")
      .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
      .collect();
  },
});
