"use client";

import { useState} from "react";
import { useQuery } from "convex/react";
import { useOrganization, useUser } from "@clerk/nextjs";
import { api } from "../../../../../convex/_generated/api";
import { Doc } from "../../../../../convex/_generated/dataModel";

import { LayoutGrid, Table } from "lucide-react";

import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent
} from "@/components/ui/tabs";
import {
    Select,
    SelectItem,
    SelectValue,
    SelectGroup,
    SelectContent,
    SelectTrigger,
} from "@/components/ui/select";
import { columns } from "./columns";
import { FileTable } from "./file-table";
import { Loader } from "@/components/loader";
import { FileCard } from "@/app/(root)/dashboard/_components/file-card";
import { SearchBar } from "@/app/(root)/dashboard/_components/search-bar";
import { EmptyFileMessage } from "../files/_components/empty-file-message";
import { FileUploadButton } from '@/app/(root)/dashboard/_components/file-upload-button';


type BrowserProps = {
    title: string;
    favoriteFilter?: boolean;
    deleteFilter?: boolean;
}

export default function Browser({ title, favoriteFilter, deleteFilter }: BrowserProps) {
    const [query, setQuery] = useState("");
    const [ type, setType ] = useState<Doc<"files">["fileType"] | "all">("all");
   
    const user = useUser();
    const organization = useOrganization();
    
    let orgId: string | undefined = undefined;
    if (organization.isLoaded && user.isLoaded) {
        orgId = organization.organization?.id ?? user.user?.id;
    }
    
    const favorites = useQuery(api.files.getAllFavorite, orgId ? { orgId } : "skip");

    const files = useQuery(api.files.getFiles, orgId ? { orgId, query, fileType: type === "all" ? undefined : type , favorites: favoriteFilter, deletes: deleteFilter } : "skip");

    const isLoading = files === undefined;

    const modifiedFiles = files?.map((file) => ({
        ...file,
        isFavorited: (favorites ?? []).some((favorite) => favorite.fileId === file._id)
    })) ?? [];


    return (
        <>
            <div className="flex items-center justify-between mb-10 sm:mb-20 space-x-1">
                <h1 className="text-xl sm:text-2xl md:text-4xl font-semibold">{title}</h1>
                <div className="flex items-center gap-x-1 sm:gap-x-2">
                    <SearchBar setQuery={setQuery} query={query} />
                    <FileUploadButton />
                </div>
            </div>

            <Tabs defaultValue="grid" >
                <div className="flex items-center justify-between mb-8">
                    <TabsList className="bg-background">
                        <TabsTrigger value="grid" className="flex items-center gap-x-2"><LayoutGrid className="h-4 w-4" />Grid View</TabsTrigger>
                        <TabsTrigger value="table" className="flex items-center gap-x-2"><Table className="h-4 w-4" />Table View</TabsTrigger>
                    </TabsList>
                    <div className="flex items-center">
                    <Select value={type} onValueChange={(type) => { setType(type as any) }}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter " />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            <SelectItem value="image">Image</SelectItem>
                            <SelectItem value="csv">CSV</SelectItem>
                            <SelectItem value="pdf">PDF</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    </div>
                </div>

                {isLoading && <Loader />}

                <TabsContent value="grid">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8">
                        {modifiedFiles?.map((file) => (
                            <FileCard key={file._id} file={file} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="table">
                    <FileTable columns={columns} data={modifiedFiles} />
                </TabsContent>
            </Tabs>

            {!isLoading && files.length === 0 && <EmptyFileMessage />}
        </>
    )
}