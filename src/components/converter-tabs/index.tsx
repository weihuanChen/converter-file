"use client";
import { useState } from "react";
import Tab from "../converter-tab";
import { useTranslations } from "next-intl";

export default function ConverterTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const t = useTranslations("Converter");
  const tabs = [t("tabToJpg")];
  return (
    <>
      <section className="max-w-full" aria-multiselectable="false">
        <ul
          className="flex items-center border-b border-slate-200"
          role="tablist"
        >
          {tabs.map((label, index) => (
            <Tab
              key={`tab-${index}-${label}`}
              id={`tab-label-${index}`}
              label={label}
              isActive={activeTab === index}
              positionInSet={tabs.length}
              setSize={tabs.length}
              onClick={() => setActiveTab(index)}
            />
          ))}
        </ul>
      </section>
    </>
  );
}
