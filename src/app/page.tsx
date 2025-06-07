"use client"
import Image from "next/image";
import ConverterHeader from "./components/converter-header";
import ConverterPage from "./views/ConverterPage/page";
import ConverterFooter from "./components/converter-footer";
export default function Home() {
  return (
    <div>
      <ConverterHeader />
      <ConverterPage />
    </div>
  );
}
