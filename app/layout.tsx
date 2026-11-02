import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bihar Energy | Grievance Workbench",
  description: "Source-backed electricity office lookup and officer-led grievance follow-up.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
