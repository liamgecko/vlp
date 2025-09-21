import type { Metadata } from "next";
import { Poppins, Caprasimo } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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
  title: "Victoria Photography",
  description: "Victoria Photography",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden overscroll-none">
      <body
        className={`${poppins.variable} ${caprasimo.variable} antialiased relative bg-[#FFF4EB]`}
      >     
        <div 
          className="absolute inset-0 h-[100vh] -z-10 opacity-20"
          style={{
            background: 'linear-gradient(to bottom, #FFE2C7, #FFD39C, #FD8B60, #FD6060, #5A4E8F, #FFF4EB)'
          }}
        ></div>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
