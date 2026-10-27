import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "We Dream Media | Creative Agency",
  description:
    "Turning visions into digital reality. We Dream Media is a high-end creative agency specializing in video, design, and digital experiences.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} antialiased`}>
      <body className="min-h-screen">
        <link
          rel="stylesheet"
          href="https://use.typekit.net/wqh8aje.css"
          precedence="default"
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
