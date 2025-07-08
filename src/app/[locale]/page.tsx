"use client";
import ConverterHeader from "@/components/converter-header";
import { useTranslations } from "next-intl";
import ConverterPage from "./converter/page";
export default function Home() {
  // const t = useTranslations("Home");
  return (
    <div>
      <ConverterHeader />
      <ConverterPage />
    </div>
  );
}
