import {mutation} from "../_generated/server"
import {components} from "../_generated/api"
import {Agent} from "@convex-dev/agent"
import {google} from "@ai-sdk/google"

const DEMO_USER_ID = "demo-user-123"
const myAgent = new Agent(components.agent, {
    chat: google.chat("gemini-2.0-flash"),
    instructions: "Youre a helpful assistant on Nyenzo's portfolio. Keep your answers concise",
    textEmbeddingModel: google.textEmbeddingModel("text-embedding-004"),
})
export const createThread = mutation({
    args: {},
    handler: async(ctx) => {
        const {threadId} = await myAgent.createThread(ctx, {
            userId: DEMO_USER_ID
        })
        return threadId
    }
})

