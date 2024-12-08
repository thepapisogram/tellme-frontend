import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages | Tell Me",
  description:
    "View your messages on Tell Me"
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
