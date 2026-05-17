import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { MemoriesProvider } from "@/contexts/MemoriesContext";
import { CountriesProvider } from "@/contexts/CountriesContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Atlas — Travel Journal",
  description:
    "A premium personal travel memory archive. Your world slowly comes alive through memories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-atlas-bg text-atlas-text">
        <CountriesProvider>
          <MemoriesProvider>
            <AppShell>{children}</AppShell>
          </MemoriesProvider>
        </CountriesProvider>
      </body>
    </html>
  );
}
