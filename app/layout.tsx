import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";
import { Providers } from "./provider";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Time To Go!",
  description: "Generated by create next app",
  icons: {
    icon: "/favicon.ico", 
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AuthProvider>
            <Toaster position="top-center" />
            {children}
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
