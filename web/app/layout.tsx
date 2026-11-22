import type { Metadata } from "next";
import { Noto_Sans, Noto_Sans_Devanagari } from "next/font/google";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const latin = Noto_Sans({ subsets: ["latin"], display: "swap", variable: "--font-noto" });
const deva = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  display: "swap",
  variable: "--font-noto-deva",
});

const description =
  "For small FMCG distributors in India: beat ledgers, collections, and a daily close that reconciles cash, UPI and credit.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bolcash — digital udhar khata for Indian distributors",
    template: "%s | BolCash",
  },
  description,
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
  openGraph: { siteName: "Bolcash", locale: "en_IN", type: "website" },
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
