import {internalAction} from "../../_generated/server";
import {v} from "convex/values";
import { nyenzobot } from "../lib";

export const streamStory = internalAction({
    args: {promptMessageId: v.string(), threadId: v.string()},
    handler: async (ctx, {promptMessageId, threadId}) => {
        await nyenzobot.generateAndSaveEmbeddings(ctx, {
            messageIds: [promptMessageId]
        })
        //start streaming the response
    const result = await nyenzobot.streamText(
        ctx, 
      
            {threadId},
            {promptMessageId},
        {   
            saveStreamDeltas: {
                chunking: "word",
                throttleMs: 250
            } 
        }
    )
    await result.consumeStream()
}
});