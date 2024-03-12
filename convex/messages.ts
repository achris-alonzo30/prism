import { v } from "convex/values";
import { internal } from "./_generated/api";
import { mutation, query } from "./_generated/server";

export const messages = query({
  args: {
    sessionId: v.string(),
  },
  handler: async (ctx, args) => {
    return (
      await ctx.db
        .query("messages")
        .withIndex("bySessionId", (q) => q.eq("sessionId", args.sessionId))
        .collect()
    ).map(({ message: { data, type }, ...fields }) => ({
      ...fields,
      isViewer: type === "human",
      text: data.content,
    }));
  },
});

export const sendMessage = mutation({
  args: {
    message: v.string(),
    sessionId: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.scheduler.runAfter(0, internal.serve.answer, {
      sessionId: args.sessionId,
      message: args.message,
    });

  },
});

export const clearMessage = mutation({
  args: {
    sessionId: v.string(),
  },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("bySessionId", (q) => q.eq("sessionId", args.sessionId))
      .collect();

    await Promise.all(messages.map((message) => ctx.db.delete(message._id)));
  },
});
