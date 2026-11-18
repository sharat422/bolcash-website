import type { Metadata } from "next";
import { Noto_Sans, Noto_Sans_Devanagari } from "next/font/google";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

const latin = Noto_Sans({ subsets: ["latin"], display: "swap", variable: "--font-noto" });
const deva = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  display: "swap",
  variable: "--font-noto-deva",
});

export const metadata: Metadata = {
  title: "BolCash",
  description: "BolCash: digital udhar khata and cash book for Indian shop owners.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${latin.variable} ${deva.variable}`}>
      <body className="flex min-h-screen flex-col bg-canvas font-sans text-base text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-20 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
        >
          Skip to content
        </a>
        <Header />
        <Container className="flex-1 py-8">
          <main id="main">{children}</main>
        </Container>
        <Footer />
      </body>
    </html>
  );
}
