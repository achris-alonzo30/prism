"use client";

import Image from "next/image";
import { useState } from "react";
import { useQuery } from "convex/react";
import { Triangle } from "react-loader-spinner";
import { api } from "../../../../convex/_generated/api";
import { useOrganization, useUser } from "@clerk/nextjs";

import { FileUpload } from '@/components/file-upload';
import { FileCard } from "@/components/file-card";
import { SearchBar } from "@/components/search-bar";
import { EmptyFile } from "./_components/empty-file";


export default function DashboardPage() {
    const user = useUser();
    const organization = useOrganization();
    const [query, setQuery] = useState("");

    let orgId: string | undefined = undefined;
    if (organization.isLoaded && user.isLoaded) {
        orgId = organization.organization?.id ?? user.user?.id;
    }

    const files = useQuery(api.files.getFiles, orgId ? { orgId, query } : "skip")
    const isLoading = files === undefined;


    return (
        <main className="container mx-auto pt-12 px-8">
            <div className="flex items-center justify-between mb-10 sm:mb-20">
                <h1 className="text-2xl font-semibold">Dashboard</h1>
                <div className="flex items-center gap-x-2">
                    <SearchBar setQuery={setQuery} query={query} />
                    <FileUpload />
                </div>
            </div>

            {!isLoading && files.length === 0 && <EmptyFile />}

            {isLoading && (
                <div className="flex flex-col items-center justify-center mx-auto space-y-4 w-full">
                    <Triangle
                        visible={true}
                        height="80"
                        width="80"
                        color="#2bf8b5"
                        ariaLabel="triangle-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                    <p className="text-lg font-semibold underline decoration-highlight-color text-primary-color decoration-4">Loading Your Files</p>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {files?.map((file) => (
                    <FileCard key={file._id} file={file} />
                ))}
            </div>

        </main>
    )
}