import type { Metadata } from "next";
import { Inter } from "next/font/google"
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";

const font = Inter({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
