import { Pinecone } from '@pinecone-database/pinecone';
import { Id } from '../../convex/_generated/dataModel';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';

const apiKey = process.env.PINECONE_API_KEY;

if (!apiKey) throw new Error("PINECONE_API_KEY is not set");

const pc = new Pinecone({apiKey});

export const index = pc.index('prism');

export async function createEmbeddings(fileUrl: string) {
    const loader = new PDFLoader(fileUrl)
    

    if (!loader) throw new Error("No loader found");

    const pages = await loader.load();

    return pages;
}