import { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function constructMetadata({
  title = "Prism - A real-time storage powered by AI",
  description = "Experience the transformative power of Prism's lightning speed and AI-driven mastery, unlocking real-time insights to simplify mundane tasks, empowering individuals for efficient automation and freeing up time for what truly matters in life.",
  image = "/prism-thumbnail.png",
  icons = "/logo.svg",
  noIndex = false
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@chrislonzo"
    },
    icons,
    metadataBase: new URL('https://prism-silk.vercel.app'),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    })
  }
}
