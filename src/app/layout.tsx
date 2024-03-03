import "./globals.css";
import { cn } from '../lib/utils';
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/providers/theme-provider";
import ConvexClientProvider from "@/providers/convex-client-provider";

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
    <html lang="en" suppressHydrationWarning>
      
      <body className={cn(`min-h-screen font-sans antialiased `, inter.className)}>
        <ConvexClientProvider>
          <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
          <Header />
          {children}
          <Toaster />
          </ThemeProvider>
        </ConvexClientProvider>
        
      </body>
      
    </html>
  );
}
