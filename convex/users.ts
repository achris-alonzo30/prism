import { ConvexError, v } from "convex/values";
import { MutationCtx, QueryCtx, internalMutation, query } from "./_generated/server";
import { roles } from "./schema";

export async function getUser(ctx: QueryCtx | MutationCtx, tokenIdentifier: string) {
  const user = await ctx.db
    .query("users")
    .withIndex("by_tokenIdentifier", (q) =>
      q.eq("tokenIdentifier", tokenIdentifier)
    )
    .first();

    if (!user) throw new ConvexError("User not found");

    return user;
}

export const createUser = internalMutation({
  args: { tokenIdentifier: v.string(), name: v.string(), profileImage: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("users", {
      tokenIdentifier: args.tokenIdentifier,
      orgIds: [],
      name: args.name,
      profileImage: args.profileImage,
    });
  },
});

export const updateUser = internalMutation({
  args: { tokenIdentifier: v.string(), name: v.string(), profileImage: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db.query("users").withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", args.tokenIdentifier)).first();

    if (!user) throw new ConvexError("User not found");


    await ctx.db.patch(user._id, {
      name: args.name,
      profileImage: args.profileImage,
    });
  },
});

export const getUserProfile = query({
  args: { userId: v.id("users")},
  handler: async(ctx, args) => {
    const user = await ctx.db.get(args.userId);

    if (!user) throw new ConvexError("User not found");

    return { name: user.name, profileImage: user.profileImage };
  }
})

export const addUserToOrg = internalMutation({
  args: { tokenIdentifier: v.string(), orgId: v.string(), role: roles },
  handler: async (ctx, args) => {
    const user = await getUser(ctx, args.tokenIdentifier);

    await ctx.db.patch(user._id, {
      orgIds: [...user.orgIds, { orgId: args.orgId, role: args.role}],
    });
  },
});

export const updateUserRoleToOrg = internalMutation({
  args: { tokenIdentifier: v.string(), orgId: v.string(), role: roles },
  handler: async (ctx, args) => {
    const user = await getUser(ctx, args.tokenIdentifier);

    const organization = user.orgIds.find((org) => org.orgId === args.orgId);

    if (!organization) throw new ConvexError("Organizaiton not found");

    organization.role = args.role

    await ctx.db.patch(user._id, {
      orgIds: user.orgIds,
    });
  },
});

export const getSelf = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) return null;

    const user = await getUser(ctx, identity.tokenIdentifier);

    if (!user) return null;

    return user;
  }
})
