/*** 文件上传并转换 */

import { useRef, useState } from "react";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type UploadResponse<T = any> = {
	data: T;
	status: number;
};
type UploadOptions = {
	url: string;
	filedName?: string; // 表单字段名，默认files
	headers?: Record<string, string>;
	onProgress?: (progress: number) => void;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function useFileUpload<T = any>() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const [progress, setProgress] = useState(0);
	const abortControllerRef = useRef<AbortController | null>(null);
	const xhrRef = useRef<XMLHttpRequest | null>(null);
	const upload = async (
		files: FileList | File[],
		options: UploadOptions,
	): Promise<UploadResponse<T>> => {
		abortControllerRef.current = new AbortController();
		setIsLoading(true);
		setError(null);
		setProgress(0);
		try {
			const formData = new FormData();
			const filesArray = Array.isArray(files) ? files : Array.from(files);
			for (const file of filesArray) {
				formData.append(options.filedName || "files", file);
			}
			const response = await fetch(options.url, {
				method: "POST",
				body: formData,
				signal: abortControllerRef.current.signal,
				headers: options.headers,
			});
			// 处理响应
			if (!response.ok) {
				throw new Error(`http error! status:${response.status}`);
			}
			const data = (await response.json()) as T;
			return {
				data,
				status: response.status,
			};
		} catch (err) {
			const error = err instanceof Error ? err : new Error("Upload failed");
			setError(error);
			throw error;
		} finally {
			abortControllerRef.current = null;
			setIsLoading(false);
		}
	};
	// 进度条上传
	const uploadWithProgress = async (
		files: FileList | File[],
		options: UploadOptions,
	): Promise<UploadResponse<T>> => {
		setIsLoading(true);
		setError(null);
		setProgress(0);
		return new Promise<UploadResponse<T>>((resolve, reject) => {
			const formData = new FormData();
			const filesArray = Array.isArray(files) ? files : Array.from(files);
			for (const file of filesArray) {
				formData.append(options.filedName || "files", file);
			}

			const xhr = new XMLHttpRequest();
			xhrRef.current = xhr;

			xhr.open("POST", options.url);

			// 设置自定义头部
			if (options.headers) {
				for (const [key,value] of Object.entries(options.headers)) {
					xhr.setRequestHeader(key, value);
				}
			}

			// 进度事件
			xhr.upload.onprogress = (event) => {
				if (event.lengthComputable) {
					const percent = Math.round((event.loaded / event.total) * 100);
					setProgress(percent);
					options.onProgress?.(percent);
				}
			};

			xhr.onload = () => {
				if (xhr.status >= 200 && xhr.status < 300) {
					resolve({
						data: JSON.parse(xhr.responseText) as T,
						status: xhr.status,
					});
				} else {
					reject(new Error(`Upload failed with status ${xhr.status}`));
				}
			};

			xhr.onerror = () => reject(new Error("Network error"));
			xhr.onabort = () => reject(new Error("Upload cancelled"));

			xhr.send(formData);
		}).finally(() => {
			setIsLoading(false);
			xhrRef.current = null;
		});
	};
	// 取消上传
	const abort = () => {
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
			setError(new Error("upload cancelled by user"));
		}
	};
	return { upload,uploadWithProgress, abort, isLoading, progress, error };
}
