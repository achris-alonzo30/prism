"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { useOrganization, useUser } from "@clerk/nextjs";
import { api } from "../../../../../convex/_generated/api";

import { Loader } from "@/components/loader";
import { EmptyFile } from './_components/empty-file';
import { FileUpload } from '@/app/(root)/dashboard/files/_components/file-upload';
import { FileCard } from "@/app/(root)/dashboard/files/_components/file-card";
import { SearchBar } from "@/app/(root)/dashboard/files/_components/search-bar";

export default function FilesPage() {
    const user = useUser();
    const organization = useOrganization();
    const [query, setQuery] = useState("");

    let orgId: string | undefined = undefined;
    if (organization.isLoaded && user.isLoaded) {
        orgId = organization.organization?.id ?? user.user?.id;
    }

    const files = useQuery(api.files.getFiles, orgId ? { orgId, query} : "skip")
    const isLoading = files === undefined;
    return (
        <>
            <div className="flex items-center justify-between mb-10 sm:mb-20">
                <h1 className="text-2xl font-semibold">Your Files</h1>
                <div className="flex items-center gap-x-2">
                    <SearchBar setQuery={setQuery} query={query} />
                    <FileUpload />
                </div>
            </div>

            {isLoading && <Loader />}

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3  gap-4">
                {files?.map((file) => (
                    <FileCard key={file._id} file={file} />
                ))}
            </div>

            {!isLoading && files.length === 0 && <EmptyFile />}
        </>
    )
}