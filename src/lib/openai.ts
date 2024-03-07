import OpenAi from "openai";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set");
}

export const openai = new OpenAi({apiKey});

export async function getEmbedding(content: string) {
    const response = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: content
    });

    const embeddings = response.data[0].embedding;

    if (!embeddings) throw new Error("Failed to get embeddings");

    return embeddings;
}