import type { Metadata } from "next";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";
import { Providers } from "./provider";

const inter = Inter({ subsets: ["latin"], display: "swap"});


const Toaster = dynamic(() => import("react-hot-toast").then((mod) => mod.Toaster), { ssr: false });

export const metadata: Metadata = {
  title: "Time To Go!",
  description: "Find and track the best flight deals.",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Providers>
            <Toaster position="top-center" />
            {children}
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
