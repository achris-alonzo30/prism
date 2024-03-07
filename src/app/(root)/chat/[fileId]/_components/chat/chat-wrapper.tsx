import Image from "next/image";
import { ChatInput } from "./chat-input";

export const ChatWrapper = () => {
    return ( 
        <div className="relative min-h-full flex flex-col divide-y divide-primary-color/80 justify-between gap-2 ">
            <div className="flex-1 justify-between flex flex-col mb-28">
                <div className="flex flex-col text-center mx-auto items-center justify-center space-y-4 mt-24">
                    <Image src="/logo.svg" alt="logo" width={50} height={50} />
                    <h1 className="text-lg font-medium">Start asking question about your downloaded pdf.</h1>
                </div>
            </div>
            <ChatInput />
        </div>
    )
}