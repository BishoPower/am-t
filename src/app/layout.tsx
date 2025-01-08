import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme"; // Updated import path

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AM-T",
  description: "One Mans Trash Is Another Mans Treasure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${manrope.className} bg-[white]`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
