import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Valentines Invitation",
  description: "Will you be my valentine?",
  icons: {
    icon: "/fav.png",
  },
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
