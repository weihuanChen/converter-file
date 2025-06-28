import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import sharp from "sharp";
import path from "node:path";
export class ImageConverterService {
	private readonly outputDir = path.join(process.cwd(), "public/converted");
	constructor() {
		// 确保输出目录存在
		fs.mkdir(this.outputDir, { recursive: true });
	}
	/**
	 * 将webp转换为jpg
	 * @param fileBuffer 上传文件的buffer
	 * @returns 转换后的文件路径，相当于public
	 *
	 */
	async webpToJpeg(fileBuffer: Buffer): Promise<string> {
		try {
			const outputFilename = `${randomUUID()}.jpg`;
			const outputPath = path.join(this.outputDir, outputFilename);
			await sharp(fileBuffer).jpeg({ quality: 80 }).toFile(outputPath);
			return `/converted/${outputFilename}`;
		} catch (err) {
			throw new Error(
				`convert failed: ${err instanceof Error ? err.message : String(err)}`,
			);
		}
	}
    /**
   * 清理临时文件
   */
  async cleanup(fileUrl: string) {
    const filename = path.basename(fileUrl);
		const flePath = path.join(this.outputDir, filename);
    try {
			await fs.access(flePath);
			await fs.unlink(flePath);
		} catch (error) {
			console.error(`delete file failed: ${error}`);
		}
  }
	/** 清理已转换的文件 */
	async cleanupConvertedFiles() {
		try {
			const files = await fs.readdir(this.outputDir);
			const convertedFiles = files.filter((file) => file.endsWith(".converted.jpg"));
			for (const file of convertedFiles) {
				const filePath = path.join(this.outputDir,file);
				try {
					await fs.unlink(filePath)
				} catch (error) {
					console.error(`delete file failed: ${error}`);
				}
			}
		} catch (error) {
			console.error(`cleanup converted files failed: ${error}`);
		}
	}
	/** 获取已转换文件的数量 */
	async getConvertedFilesCount() :Promise<number>{
		try {
			const files = await fs.readdir(this.outputDir);
			return files.filter((file) => file.endsWith(".converted.jpg")).length;
		} catch (error) {
			console.error(`get converted files count failed: ${error}`);
			return 0;
		}
	}
}
