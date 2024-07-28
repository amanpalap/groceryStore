import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Green Grocers",
  description: "Here you buys fresh for your family",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
