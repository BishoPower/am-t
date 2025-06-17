import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme"; // Updated import path
import ReactQueryProvider from "@/react-query";
import { PopupProvider } from "@/components/ui/popup";
import { ConfirmationProvider } from "@/components/ui/confirmation-dialog";
import { Toaster } from "@/components/ui/toaster";

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
            {" "}
            <ConfirmationProvider>
              <PopupProvider>
                <ReactQueryProvider>{children}</ReactQueryProvider>
                <Toaster />
              </PopupProvider>
            </ConfirmationProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
