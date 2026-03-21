import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wali | ilaW",
  description: "PORTFOLIO",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body suppressHydrationWarning className={`${geistSans.className} ${geistMono.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
        <Toaster position="bottom-right" toastOptions={{ className: 'bg-gray-800 text-white border border-gray-700' }} />
      </body>
    </html>
  );
}
