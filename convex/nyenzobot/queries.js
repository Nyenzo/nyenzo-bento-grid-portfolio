import { query } from "../_generated/server";
import { v } from "convex/values"
import { findThread, getAndValidateThread, nyenzobot, validateThreadBelongsToUser, filterOutToolResults } from "./lib"
import { paginationOptsValidator } from "convex/server";
import { vStreamArgs } from "@convex-dev/agent";


export const findThreadForUser = query({
    args: {
        threadId: v.string(),
        userId: v.id('users')
    },
    handler: async (ctx, args) => {
        
        const thread = await findThread(ctx, { threadId: args.threadId })
        if (!thread) return null

        validateThreadBelongsToUser({ thread, userId: args.userId })

        return thread
    }
})
export const listMessagesForUserThread = query({
    args: {
        userId: v.id("users"),
        threadId: v.string(),
        paginationOpts: paginationOptsValidator,
        streamArgs: vStreamArgs,
    },

    handler: async (ctx, args) => {
        await getAndValidateThread(ctx, { threadId: args.threadId, userId: args.userId})

        const paginated = await nyenzobot.listMessages(ctx, {
            threadId: args.threadId,
            paginationOpts: args.paginationOpts
        })

        paginated.page = filterOutToolResults(paginated.page)

        const streams = await nyenzobot.syncStreams(ctx, {
            threadId: args.threadId,
            streamArgs: args.streamArgs
    })

    return  {...paginated, streams}
    }
})