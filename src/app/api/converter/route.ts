import { ImageConverterService } from "@/lib/services/image-converter.service";
import { NextResponse } from "next/server";
import z from "zod";

const schema = z.object({
	file: z
		.instanceof(File)
		.refine((file) => file.type === "image/webp", { message: "仅支持webp格式" })
		.refine((file) => file.size < 5 * 1024 * 1024, {
			message: "文件大小不能超过5MB",
		}),
});
const converter = new ImageConverterService();
export async function POST(req: Request) {
	try {
		const formData = await req.formData();
		const { file } = schema.parse(Object.fromEntries(formData));
		// 转换buffer
		const buffer = Buffer.from(await file.arrayBuffer());
		// 转换服务
		const convertedUrl = await converter.webpToJpeg(buffer);

		return NextResponse.json({
			original: file.name,
			convertedUrl,
		});
	} catch (err) {
		return NextResponse.json({ error: "Invalid file format" }, { status: 400 });
	}
}
