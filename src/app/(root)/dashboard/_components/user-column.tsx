"use client";

import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel"


export const UserCell = ({ userId }: { userId: Id<"users">}) => {
    const userProfile = useQuery(api.users.getUserProfile, { userId});

    if (!userProfile) return null;

    return (
        <div className="flex items-center gap-x-2">
            <Image src={userProfile.profileImage!} alt="profile image" width={30} height={30} className="object-cover aspect-square rounded-full" />
            {userProfile.name}
        </div>
    )
}