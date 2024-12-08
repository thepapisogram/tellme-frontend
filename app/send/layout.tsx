import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Send Message | Tell Me",
  description:
    "Hey! Send me an anonymous message or feedback anonymously.  Don’t worry, I won’t know it’s you. 😊"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
