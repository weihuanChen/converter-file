"use client";
import ConverterUpload from "@/components/converter-upload";
import { useState } from "react";

export default function ConverterPage() {
  const [result, setResult] = useState<{
    convertedUrl?: string;
    error?: string;
  }>();
  const [isUploading, setIsUploading] = useState(false);
  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) {
      setResult({ error: "please choice file" });
      return;
    }
    setIsUploading(true);
    setResult(undefined); // 清除之前的结果
    console.log("Selected files:", Array.from(files));
    try {
      const file = files?.[0];
      if (file.size > 50 * 1024 * 1024) {
        throw new Error("文件大小不能超过50MB");
      }
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/converter", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "转换失败");
      }

      setResult({ convertedUrl: data.convertedUrl });
      // 自动下载转换后的文件
      if (data.convertedUrl) {
        const a = document.createElement("a");
        a.href = data.convertedUrl;
        a.download = `converted_${file.name.replace(".webp", ".jpg")}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch (err) {
      setResult({
        error: err instanceof Error ? err.message : "上传失败",
      });
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <main className="flex-1 grid grid-cols-3 gap-8 p-8">
      {/** 左侧空窗区域 */}
      <div className="flex items-center justify-end">
        {/* 保留空白区域用于布局平衡 */}
      </div>

      {/** 文件上传区域 */}
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="text-center w-full max-w-xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            转换WEBP到JPG文件
          </h1>
          <p className="text-lg text-gray-600">免费转换WEBP图片文件到JPG格式</p>

          <div className="w-full max-w-md mt-6">
            <ConverterUpload
              className="border-2 border-dashed border-gray-300 hover:border-indigo-500 transition-colors"
              id="file-uploader"
              accept="image/webp" // 明确只接受webp
              onFileChange={handleFiles}
              disabled={isUploading}
            />
          </div>

          {/* 上传状态提示 */}
          {isUploading && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-600 flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-500"
                  aria-label="Loading"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <title>Loading icon</title>
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                正在转换中，请稍候...
              </p>
            </div>
          )}

          {/* 结果展示 */}
          {result?.error && (
            <div className="mt-4 p-4 bg-red-50 rounded-lg">
              <p className="text-red-600">{result.error}</p>
            </div>
          )}

          {result?.convertedUrl && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <p className="text-green-600">转换成功！文件已自动下载</p>
              <p className="text-sm text-gray-500 mt-1">
                如果未自动下载，请
                <a
                  href={result.convertedUrl}
                  download
                  className="text-indigo-600 hover:underline ml-1"
                >
                  点击这里
                </a>
              </p>
            </div>
          )}

          <div className="prose prose-sm text-gray-500 mt-4 text-center">
            <p>支持批量转换，最大50MB/文件</p>
            <p>转换过程在服务器完成，保障隐私安全</p>
          </div>
        </div>
      </div>

      {/** 导航说明区域 */}
      <div className="flex items-center justify-start">
        {/* 保留空白区域用于布局平衡 */}
      </div>
    </main>
  );
}
