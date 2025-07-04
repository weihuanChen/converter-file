import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
type RootLayoutProps = {
  children: React.ReactNode;
  params?: { locale?: string }; // 允许可选的多语言参数
};
export default function RootLayout({ children, params = {} }: RootLayoutProps) {
  const lang = params?.locale || "en";
  return (
    <html lang={lang}>
      <body className="flex flex-col min-h-screen">
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
