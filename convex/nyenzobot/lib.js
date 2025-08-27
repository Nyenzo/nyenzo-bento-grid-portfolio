import { components, internal } from "../_generated/api"
import { google } from "@ai-sdk/google"
import { Agent, createTool, stepCountIs } from "@convex-dev/agent"
import {z} from "zod"
import {fetchWeatherData} from "../utils"


export const nyenzobotTools = {
    searchAboutNyenzo: createTool({
        description: "Search for information about Nyenzo",
        args: z.object({
            query: z.string(),
        }),
        handler: async (ctx, args) => 
            ctx.runAction(internal.documents.internal.actions.ragSearchAboutNyenzo,{
                query: args.query
            })
    }),
    getWeather: createTool({
        description: "Get the current weather for a given location",
        args: z.object({
            location: z.string().describe("The city name or location to get the weather for, e.g., 'New York, NY', Nairobi, Moscow"),
        }),
        handler: async (ctx, args) => {
                return await fetchWeatherData(args.location);
            },
    })
}

export const nyenzobot = new Agent(components.agent, {
    name: "Nyenzobot",
    languageModel: google('gemini-2.0-flash'),
    textEmbeddingModel: google.textEmbeddingModel("text-embedding-004"),
    instructions: 
    `
    You are Nyenzobot, a helpful assistant on Nyenzo's portfolio website.
    Help users with their inquiries and provide relevant information about Nyenzo's work and experience.
    Respond with markdown format with casual tone.
    Strictly use searchAboutNyenzo tool when asked about nyenzo.
    Use getweather tools if someone asks about weather.
    if you dont have an answer say you dont know and give a funfact about ai.
    `,
    tools: nyenzobotTools,
    stopWhen: stepCountIs(10) 
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

export const filterOutToolResults = (messages) => 
    messages
.map((message) => {
    if(message.message.role === 'tool' && message.message.content[0].type == "tool-result")
        return null;
    return message
})
.filter((message) => {
    if(message == null) return false;
    if(message == undefined) return false;
    return true;
})