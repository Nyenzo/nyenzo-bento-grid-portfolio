import {mutation} from "../_generated/server"
import {v} from "convex/values"
import { nyenzobot, validateUserExists, getAndValidateThread } from "./lib"
import { internal } from "../_generated/api"

export const createThreadForUser = mutation({
    args: {
        userId: v.id('users')
    },
    handler: async (ctx, args) => {

        await validateUserExists(ctx.db, {userId: args.userId})
        const thread = await nyenzobot.createThread(ctx, {
            userId: args.userId
        })
        return thread.threadId
    }
})
export const sendMessageToThreadFromUser = mutation({
    args: {
         message: v.string(),
        threadId: v.string(),
        userId: v.id('users')
    },
    handler: async (ctx, args) => {

    await getAndValidateThread(ctx, { thread: args.threadId, userId: args.userId})

        const { messageId } = await nyenzobot.saveMessage(ctx, {
            threadId: args.threadId,
            prompt: args.message,

            skipEmbeddings: true
        })
        // SCHEDULE THE ACTUAL CALL TO THE LLM TO STREAM IT
         await ctx.scheduler.runAfter(0, internal.nyenzobot.internal.actions.streamStory, {
            threadId: args.threadId,
            promptMessageId: messageId
        })
    }
})