"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname(); // 示例: /about (不含 /en)
  const locale = useLocale();
  const switchLocale = (newLocale: string) => {
    // 保留当前路径，仅替换语言前缀
    router.push(`/${newLocale}${pathname}`);
  };
  return (
    <div>
      <button 
        onClick={() => switchLocale('en')}
        disabled={locale === 'en'}
        type="button"
      >English</button>
      <button
        onClick={() => switchLocale('zh')}
        disabled={locale === 'zh'}
        type="button"
      >中文</button>
    </div>
  );
}
