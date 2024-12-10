import type { Metadata } from "next";
import { Instrument_Sans } from 'next/font/google';
import "./globals.css";

const instrument = Instrument_Sans({ weight: "400", subsets: ['latin']});

export const metadata: Metadata = {
  title: "Tell Me | Anonymous Messaging",
  description:
    "Connect with friends in a unique way—send and receive anonymous messages with ease. Share your profile link and uncover their thoughts, all while staying anonymous and secure.",
  authors: [{ name: "Anthony Saah", url: "https://anthonysaah.netlify.app/" }],
  icons: "/favicon.png",
  keywords: "tellme, tell me, anonymous messaging, fun messaging, tellme anonymous messaging, tellme anonymous feedback, anonymous feedback, fun feedback, tellme anthony, tellme saah, tellme anthony saah, anthony saah, tell me"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${instrument.className} antialiased bg-gradient-to-br from-orange-700 to-cyan-900 dark:from-orange-950 dark:to-orange-950 overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
