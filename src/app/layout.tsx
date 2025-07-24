import type { Metadata } from "next";
import { Poppins, Caprasimo } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

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
    <html lang="en">
      <body
        className={`${poppins.variable} ${caprasimo.variable} antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
