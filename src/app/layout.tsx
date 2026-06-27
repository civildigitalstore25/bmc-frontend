import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ASSETS } from "@/lib/constants/assets";
import { SITE } from "@/lib/constants/content";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: SITE.TITLE,
    template: `%s | ${SITE.SHORT_NAME}`,
  },
  description: SITE.DESCRIPTION,
  icons: {
    icon: [{ url: ASSETS.IMAGES.FAVICON, type: "image/png" }],
    apple: [{ url: ASSETS.IMAGES.FAVICON, type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
