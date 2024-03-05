import "./globals.css";
import { Inter } from "next/font/google";
import { cn, constructMetadata } from '../lib/utils';

import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/providers/theme-provider";
import ConvexClientProvider from "@/providers/convex-client-provider";

import 'simplebar-react/dist/simplebar.min.css';
import 'react-loading-skeleton/dist/skeleton.css';


const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      
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
