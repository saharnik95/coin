import type { Metadata } from "next";
import localFont from "next/font/local";
import "../module/core/styles/globals.css";
import RootLayoutComponent from "@/module/layout/components/RootLayoutComponent";

const iran_sans_font = localFont({
  src: [
    {
      path: "../assets/font/IRANSansWeb_Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/font/IRANSansWeb_FaNum.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/font/IRANSansWeb_Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/font/IRANSansWeb_Bold_FaNum .woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/font/IRANSansWeb_Black.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-iran-sans",
});
export const metadata: Metadata = {
  title: "والت",
  description: "سایت آنلاین والت",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${iran_sans_font.variable} font-iran`}>
        <RootLayoutComponent>{children}</RootLayoutComponent>
      </body>
    </html>
  );
}
