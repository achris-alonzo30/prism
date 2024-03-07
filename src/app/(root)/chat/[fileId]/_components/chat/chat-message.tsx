"use client";

import { cn } from "@/lib/utils";
import { Message } from "ai/react";
import ReactMarkdown from "react-markdown";
import Balancer from "react-wrap-balancer";

import {
    Card,
    CardTitle,
    CardFooter,
    CardHeader,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import {
    Accordion,
    AccordionItem,
    AccordionContent,
    AccordionTrigger,
} from "@/components/ui/accordion";


const wrappedText = (text: string) =>
    text.split("\n").map((line, i) => (
        <span key={i}>
            {line}
            <br />
        </span>
    ))

interface ChatBubbleProps extends Partial<Message> {
    sources: string[];
}

export const ChatBubble = ({
    role = "system",
    content,
    sources,
}: ChatBubbleProps) => {

    if (!content) return null;

    const wrappedMessage = wrappedText(content);

    return (
        <div>
            <Card className="mb-2">
                <CardHeader>
                    <CardTitle className={cn(role != "system" ? "text-primary-color" : "text-secondary-color")}>
                        {role === "system" ? "System" : "User"}
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-primary-color">
                    <Balancer>
                        {wrappedMessage}
                    </Balancer>
                </CardContent>
                <CardFooter>
                    <CardDescription className="w-full">
                        
                    </CardDescription>
                </CardFooter>
            </Card>
        </div>
    )
}