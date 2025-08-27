import { internalAction } from "../../_generated/server";
import { v } from "convex/values";
import { rag } from "../lib";

export const insertDocument = internalAction({
    args: {
        content: v.string(),
        title: v.string(),
        hash: v.string()
    },
    handler: async (ctx, args) => {
        const result =  await rag.add(ctx, {
            namespace: "about-nyenzo",
            //used to check if doc exists or has some changes
            title: args.title,
            key:args.title,
            contentHash: args.hash,
            //document content
            text: args.content

            })
            return result;
        }
    })

export const ragSearchAboutNyenzo = internalAction({
    args: {
        query: v.string()

    },
    handler: async (ctx, args) => {
        const result = await rag.search(ctx, {
            namespace: "about-nyenzo",
            query: args.query,
            vectorScoreThreshold:0.2            
        });
        return result;
    }
})
