"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useOrganization, useUser } from "@clerk/nextjs";

import { FileUpload } from '@/components/file-upload';
import { FileCard } from "@/components/file-card";

export default function DashboardPage() {
    const user = useUser();
    const organization = useOrganization();
    
    let orgId: string | undefined = undefined;
    if (organization.isLoaded && user.isLoaded) {
      orgId = organization.organization?.id ?? user.user?.id;
    }
  
    const files = useQuery(api.files.getFiles, orgId ? { orgId } : "skip")

    return (
        <main className="container mx-auto pt-12 px-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Dashboard</h1>
                <FileUpload />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {files?.map((file) => (
                    <FileCard key={file._id} file={file} />
                ))}
            </div>

        </main>
    )
}