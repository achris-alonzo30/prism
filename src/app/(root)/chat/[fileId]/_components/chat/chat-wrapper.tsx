"use client";

import Image from "next/image";
import { useQuery } from "convex/react";
import { ChatInput } from "./chat-input";
import { ChatMessages } from "./chat-messages";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { api } from "../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../convex/_generated/dataModel";


export const ChatWrapper = ({ fileId } :  { fileId: Id<"_storage"> }) => {
    const [scrolled, setScrolled] = useState(false);
    const listRef = useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams();

    const paramsSessionId = searchParams.get("sessionId") || "";

    const sessionId =`${fileId}|${paramsSessionId}`;

    const messages = useQuery(api.messages.messages, { sessionId });

    useEffect(() => {
        if (scrolled) return;

        setTimeout(() => {
            listRef.current?.scrollTo({
                top: listRef.current.scrollHeight,
                behavior: "smooth"
            })
        }, 0)
    }, [messages, scrolled]);

    return (
        <div className="relative min-h-full flex flex-col divide-y divide-primary-color/80 justify-between gap-2 ">
            <div className="flex-1 justify-between flex flex-col mb-28">
                {messages && messages.length === 0 ? (
                    <div className="flex-1 flex flex-col text-center mx-auto items-center justify-center space-y-4 mt-4">
                        <Image src="/logo.svg" alt="logo" width={50} height={50} />
                        <h1 className="text-lg font-medium text-zinc-100">Start asking questions about your document.</h1>
                    </div>
                ) : (
                    <ChatMessages listRef={listRef} messages={messages} setScrolled={setScrolled} />
                )}
            </div>
            <ChatInput sessionId={sessionId} setScrolled={setScrolled} fileId={fileId} />
        </div>
    )
}