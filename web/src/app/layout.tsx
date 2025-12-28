import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Romantic Game Prompt Crafter",
  description:
    "Craft vivid AI prompts for romantic game concepts with tailored characters, moods, and mechanics.",
  metadataBase: new URL("https://agentic-dd0513b8.vercel.app"),
  openGraph: {
    title: "Romantic Game Prompt Crafter",
    description:
      "Design detailed romantic game prompts ready for your favourite AI assistant.",
    url: "https://agentic-dd0513b8.vercel.app",
    siteName: "Romantic Game Prompt Crafter",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Romantic Game Prompt Crafter",
    description:
      "Spin up compelling love-driven game ideas with a single click.",
  },
  authors: [{ name: "Agentic Prompt Lab" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
