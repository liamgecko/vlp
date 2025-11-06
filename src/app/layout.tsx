import type { Metadata } from "next";
import { Poppins, Caprasimo } from "next/font/google";
import "./globals.css";
import NavigationBlock from "@/components/blocks/Navigation";
import FooterBlock from "@/components/blocks/Footer";
import CallToActionBlock from "@/components/blocks/CallToAction";
import FullWidthImageClient from "@/components/blocks/FullWidthImageClient";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Analytics } from "@vercel/analytics/next"

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const caprasimo = Caprasimo({
  variable: "--font-caprasimo",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "Victoria Photography",
  description: "Victoria Photography",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden sm:overscroll-none">
      <body
        className={`${poppins.variable} ${caprasimo.variable} relative bg-[#FFF4EB]`}
      >     
        <div 
          className="absolute inset-0 h-[100vh] -z-10 opacity-20"
          style={{
            background: 'linear-gradient(to bottom, #FFE2C7, #FFD39C, #FD8B60, #FD6060, #5A4E8F, #FFF4EB)'
          }}
        ></div>
        <ErrorBoundary>
          <NavigationBlock />
          {children}
          <CallToActionBlock />
          <FullWidthImageClient />
          <FooterBlock />
        </ErrorBoundary>
      </body>
    </html>
  );
}
