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
				`转换失败: ${err instanceof Error ? err.message : String(err)}`,
			);
		}
	}
    /**
   * 清理临时文件
   */
  async cleanup(fileUrl: string) {
    const filename = path.basename(fileUrl);
    await fs.unlink(path.join(this.outputDir, filename));
  }
}
