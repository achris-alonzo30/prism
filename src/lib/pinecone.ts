import { Pinecone } from '@pinecone-database/pinecone';

const apiKey = '2bcbbb2e-ee07-45f8-9618-63b9845c53be';

if (!apiKey) throw new Error("PINECONE_API_KEY is not set");

const pc = new Pinecone({apiKey});

export const pineconeIndex = pc.Index('prism');

