"use client";
import ConverterHeader from "@/components/converter-header";
import { useTranslations } from "next-intl";
import ConverterPage from "@/app/views/ConverterPage/page";
export default function Home() {
  // const t = useTranslations("Home");
  return (
    <div>
      <ConverterHeader />
      <ConverterPage />
    </div>
  );
}
