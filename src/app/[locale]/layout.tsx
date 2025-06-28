import ConverterFooter from "@/components/converter-footer";
import { routing } from "@/i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  params: {
    locale: Promise<{ locale: string }>;
  };
};
export const locales = ["en", "zh"] as const;
export default async function LocaleLayout({ children, params }: Props) {
  // 验证语言
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // 动态加载翻译文件
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex flex-col min-h-screen">
        <div className="flex-1">{children}</div>
        <ConverterFooter />
      </div>
    </NextIntlClientProvider>
  );
}
