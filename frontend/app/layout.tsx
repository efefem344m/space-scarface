import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Space Scarface",
  description: "Video generation and publishing service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full">
      <body className={`${inter.className} min-h-full antialiased`} style={{ background: "#FAF7F2", color: "#2D1A1E" }}>
        {children}
      </body>
    </html>
  );
}
