"use client";

import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";


export const ChatInput = () => {
    return (
        <div className="absolute bottom-0 left-0 w-full pb-2">
            <form className="mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
                <div className="relative flex flex-col w-full flex-grow p-4">
                    <div className="relative">
                        <Textarea placeholder="Enter your question..." rows={1} maxRows={4} autoFocus className="resize-none pr-12 text-base py-3 scrollbar-thumb-primary-color scrollbar-thumb-rouned scrollbar-track-primary-color-light scrollbar-w-2 scrollbar-track-rounded scrolling-touch"/>
                    
                        <Button aria-label="Send message" className="absolute bottom-1.5 right-[8px]"><Send className="w-4 h-4" /></Button>
                    </div>
                </div>
            </form>  
            <p className="text-xs text-center text-muted-foreground"><strong>Prism AI</strong> can make mistakes. Consider checking important information.</p>
        </div>
    )
}