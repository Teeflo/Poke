import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import Providers from "./providers";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Agentation } from "agentation";
import { t } from '@/lib/server-i18n';
import { AppContent } from "./AppContent";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://primedex.vercel.app"),
  title: t("meta.title"),
  description: t("meta.description"),
  keywords: t("meta.keywords", { returnObjects: true }) as unknown as string[],
  authors: [{ name: t("meta.author") }],
  alternates: {
    canonical: "/",
    languages: {
      "en": "/en",
      "fr": "/fr"
    }
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: t("meta.og_title"),
    description: t("meta.og_description"),
    type: "website",
    siteName: t("meta.site_name"),
  },
  twitter: {
    card: "summary_large_image",
    title: t("meta.twitter_title"),
    description: t("meta.twitter_description"),
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-body", displayFont.variable, bodyFont.variable)}>
      <body className="antialiased bg-background text-foreground font-body">
        <Providers>
          <AppContent>
            {children}
          </AppContent>
          {process.env.NODE_ENV === "development" && <Agentation />}
        </Providers>
      </body>
    </html>
  );
}
