import { OpenAI } from "openai"

export const configureOpenAI=()=> {
    const config = new OpenAI({
        apiKey: process.env.OPEN_AI_SECRET
        , organization: process.env.OPENAI_ORGANIGATION_ID,

    })
    return config;
}