import { components } from "../_generated/api"
import { google } from "@ai-sdk/google"
import { Agent } from "@convex-dev/agent"

export const nyenzobot = new Agent(components.agent, {
    name: "Nyenzobot",
    chat: google('gemini-2.0-flash'),
    textEmbeddingModel: google.textEmbeddingModel("text-embedding-004"),
    instructions: 
    `
    You are Nyenzobot, a helpful assistant on Nyenzo's portfolio website.
    Help users with their inquiries and provide relevant information about Nyenzo's work and experience.
    Respond with markdown format with casual tone.
    `
})

export const validateUserExists = async (db, args) => {
    const user = await db.get(args.userId)
    if (!user) throw new Error(`User with ID ${args.userId} does not exist`)
    return user
}
export const findThread = async ( ctx, args ) => {
    const thread = await ctx.runQuery(components.agent.threads.getThread, {
        threadId: args.threadId
    })

    return thread

}
export const validateThreadBelongsToUser = async ({ thread, userId }) => {
    if(thread.userId != userId)
        throw new Error('Why are you snooping')

        return thread
}

export const getAndValidateThread = async (ctx, args) => {
    const thread = await findThread(ctx, { threadId: args.threadId})
    if(!thread) throw new Error('Thread not found')

        validateThreadBelongsToUser({ thread, userId: args.userId})


        return thread
}