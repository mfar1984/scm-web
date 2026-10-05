import type { Metadata } from "next";
import Script from 'next/script';
import { Inter, Poppins } from 'next/font/google';
import "./globals.css";
import Topbar from '@/components/global/Topbar';
import Header from '@/components/global/Header';
import Footer from '@/components/global/Footer';
import BodyScrollClass from '@/components/layout/BodyScrollClass';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Malaysia Premier Classification Society | SCM",
  description: "SCM is Malaysia's national premier Classification Society since 1994. We provide classification, certification, and consultancy services for the maritime industry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Runtime configuration — load before interactive so client components can read it */}
        <Script src="/runtime-config.js" strategy="beforeInteractive" />
      </head>
      <body>
        <BodyScrollClass />
        <Topbar />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
