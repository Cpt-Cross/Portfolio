import type { Metadata } from "next";
import { Chakra_Petch, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const chakra = Chakra_Petch({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-chakra",
  display: "swap",
});

const jbmono = JetBrains_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-jbmono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://captaincross.net"),
  title: "Aditya Kumar · Captain Cross // TF-141",
  description:
    "Gaming & creator-economy operator. Seven years deployed across esports, live activations, and brand partnerships. Status: active.",
  openGraph: {
    title: "Aditya Kumar · Captain Cross",
    description:
      "Gaming & creator-economy operator. Seven years deployed across esports, live activations, and brand partnerships. Status: active, cleared for deployment.",
    siteName: "Captain Cross",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Kumar · Captain Cross",
    description:
      "Gaming & creator-economy operator. Seven years deployed across esports, live activations & brand partnerships.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${chakra.variable} ${jbmono.variable}`}>
      <body suppressHydrationWarning className="scanlines">{children}</body>
    </html>
  );
}
