import type { Metadata } from "next";
import "@fontsource/noto-serif/400.css";
import "@fontsource/noto-serif-kr/400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bible Transcription Notebook",
  description: "Generate Bible transcription notebooks as PDFs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
