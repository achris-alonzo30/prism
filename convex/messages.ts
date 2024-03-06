import { v } from "convex/values";
import { query, mutation } from "./_generated/server";


export const messageLists = query({
    args: {},
    handler: async(ctx) => {
        // Grab the most recent messages.
        const messages = await ctx.db.query("messages").order("desc").take(100);
        // Reverse the list so that it's in a chronological order.
        return messages.reverse();
    }
});

export const sendMessage = mutation({
    args: { 
        orgId: v.string(),
        message: v.string(),
        userId: v.id("users"), 
        fileId: v.id("files"), 
        userMessage: v.boolean()},
    handler: async (ctx, args) => {
        await ctx.db.insert("messages", {
            userId: args.userId,
            message: args.message,
            orgId: args.orgId,
            fileId: args.fileId,
            userMesage: args.userMessage
        })
    }
})