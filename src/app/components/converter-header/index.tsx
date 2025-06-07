'use client'

import ConverterTabs from "../converter-tabs"

export default function ConverterHeader (){
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-1">
        {/* 三列布局容器*/}
        <div className="flex h-16 items-center justify-between">
          {/** tab 区域 */}
          <div className="flex flex-1 justify-center px-2 lg:px-0">
            <div className="w-full max-w-md lg:max-w-xl">
              <ConverterTabs />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}