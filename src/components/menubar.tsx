"use client";

import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  OrganizationSwitcher,
} from "@clerk/nextjs";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

import { 
  Star,
  Trash,
  FileIcon,   
  AlignLeft 
} from "lucide-react";

import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { Separator} from "@/components/ui/separator";


export function Menubar() {
  const pathname = usePathname();
  return (
    <div className="sm:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="outline-none">
            <AlignLeft className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <Logo />
            
          </SheetHeader>
          <Separator className="bg-zinc-500 mt-2" />
          <div className="flex flex-col justify-start space-y-4 my-10">
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
          <div className="flex items-center gap-x-2 mt-auto">
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
        </SheetContent>
      </Sheet>
    </div>
  )
}
