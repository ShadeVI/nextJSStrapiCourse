import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { getGlobalData, getGlobalMetadata } from "@/data/loaders";
import { Header } from "@/components/custom/Header";
import { Footer } from "@/components/custom/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export async function generateMetadata(): Promise<Metadata> {
  const {
    data: { title, description },
  } = await getGlobalMetadata();
  return {
    title: title,
    description: description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalData = await getGlobalData();
  // console.dir(globalData, { depth: null });
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header data={globalData?.data?.header} />
        {children}
        <Footer data={globalData?.data?.footer} />
      </body>
    </html>
  );
}
