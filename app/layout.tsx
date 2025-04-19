import type { Metadata } from "next";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";
import { Providers } from "./provider";
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ["latin"], display: "swap" });


const Toaster = dynamic(() => import("react-hot-toast").then((mod) => mod.Toaster), { ssr: false });

export const metadata: Metadata = {
  title: "Time To Go – Track Cheap Flights & Save Big",
  description: "Time To Go helps you find cheap flight deals and sends notifications when prices drop to your dream destinations. Travel smarter and save money!",
  keywords: ["flight deals", "cheap flights", "travel tracker", "flight alerts", "Time To Go"],
  authors: [{ name: "Mustafa Bulut", url: "https://timetogo-chi.vercel.app" }],
  creator: "Mustafa Bulut",
  metadataBase: new URL("https://timetogo-chi.vercel.app"),
  openGraph: {
    title: "Time To Go – Flight Deal Tracker",
    description: "Get real-time alerts for flight price drops and travel deals.",
    url: "https://timetogo-chi.vercel.app",
    siteName: "Time To Go",
    images: [
      {
        url: "/og-image.png", // optional: add an image in /public
        width: 1200,
        height: 630,
        alt: "Time To Go – Flight Deals",
      },
    ],

    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Time To Go",
    description: "Get alerts for cheap flights and travel smarter.",
    images: ["/og-image.png"],
  },
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
        <Analytics />
      </body>
    </html>
  );
}
