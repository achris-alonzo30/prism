"use client";

import {
    SignedIn,
    SignedOut,
    UserButton,
    SignInButton,
    OrganizationSwitcher,
} from "@clerk/nextjs";

import { Logo } from "./logo";
import { Menubar } from "./menubar";
import { Button } from "@/components/ui/button";



export const Header = () => {
    return (
        <header className="flex border-b h-14 items-center px-6">
            <Menubar />
            <div className="sm:flex items-center justify-between container mx-auto hidden">
                <Logo />
                <div className="flex items-center gap-x-2">
                    <SignedIn>
                        <div className="flex items-center gap-x-4">
                            <OrganizationSwitcher appearance={{
                                elements: {
                                    organizationPreviewTextContainer: "text-primary-color",
                                    userPreviewTextContainer: "text-primary-color",
                                    organizationSwitcherPopoverCard: "bg-white",
                                },
                            }} />
                            <UserButton afterSignOutUrl="/"  />
                        </div>
                    </SignedIn>
                    <SignedOut>
                        <SignInButton>
                            <Button className="flex items-center text-sm gap-x-2 text-white bg-primary-color/80 hover:bg-primary-color/90 transform hover:-translate-y-1 transition-all duration-400" size="sm">
                                Sign Up
                            </Button>
                        </SignInButton>
                    </SignedOut>
                </div>
            </div>

        </header>
    )
}