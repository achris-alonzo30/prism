"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { FileIcon, Star, Trash } from "lucide-react";

export const Sidebar = () => {
    const pathname = usePathname();
    return (
        <div className="w-56 sm:flex flex-col justify-start space-y-4 hidden ">
            <Link href="/dashboard/files" className={cn(`flex items-center gap-x-2 font-medium hover:underline decoration-highlight-color transform hover:-translate-y-1 transition-all duration-400`, pathname.includes("/dashboard/files") && "text-primary-color underline decoration-highlight-color decoration-4")}>
                <FileIcon className="h-4 w-4" />
                All Files
            </Link>
            <Link href="/dashboard/favorites" className={cn(`flex items-center gap-x-2 font-medium hover:underline decoration-highlight-color transform hover:-translate-y-1 transition-all duration-400`, pathname.includes("/dashboard/favorites") && "text-primary-color underline decoration-highlight-color decoration-4")}>
                <Star className="h-4 w-4" />
                Favorites
            </Link>
            <Link href="/dashboard/trash" className={cn(`flex items-center gap-x-2 font-medium hover:underline decoration-highlight-color transform hover:-translate-y-1 transition-all duration-400`, pathname.includes("/dashboard/trash") && "text-primary-color underline decoration-highlight-color decoration-4")}>
                <Trash className="h-4 w-4" />
                Trash
            </Link>
        </div>
    )
}