import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/providers/theme-provider";
import ConvexClientProvider from "@/providers/convex-client-provider";
import { cn } from '../lib/utils';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prism",
  description: "A real-time storage and retrieval tool",
  icons: {
    icon: "/logo.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
      <body className={cn(`min-h-screen font-sans antialiased grainy`, inter.className)}>
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
        
      </body>
      </ThemeProvider>
    </html>
  );
}