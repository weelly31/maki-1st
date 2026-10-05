import type { Metadata, Viewport } from "next";
import { Fredoka, Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";

const display = Outfit({
  variable: "--f-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Friendly rounded face for accent lines like "Turning ONE!"
const script = Fredoka({
  variable: "--f-script",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Plus_Jakarta_Sans({
  variable: "--f-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Makarius's 1st Birthday • You're Invited",
  description:
    "Join us on November 7, 2026 at 3:00 PM at Tanglaw Touch Care Foundation as we celebrate one beautiful year of God's blessings with Makarius Kleon Andrade.",
};

export const viewport: Viewport = {
  themeColor: "#fbf7ee",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${script.variable} ${body.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}

