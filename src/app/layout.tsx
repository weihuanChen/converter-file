import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Online Image Converter - Free & Fast | File Converter",
  description:
    "Convert images to JPG, PNG, WebP and more formats online for free. Fast, secure, no registration required. Try our easy-to-use file converter now!",
};
type RootLayoutProps = {
  children: React.ReactNode;
  params?: Promise<{ locale?: string }>; // 允许可选的多语言参数
};
export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const resolvedParams = await params;
  const lang = resolvedParams?.locale || "en";
  return (
    <html lang={lang}>
      <body className="flex flex-col min-h-screen">
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
