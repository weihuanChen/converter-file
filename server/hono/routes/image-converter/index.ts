import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { ImageConverterService } from "../../../core/services/image-converter.service";
import { z } from "zod";


const converterRouter = new Hono();
const converterService = new ImageConverterService();
// 定义 Zod 验证 schema
const schema = z.object({
	file: z
		.instanceof(File, { message: "请上传有效文件" })
		.refine((f) => f.type === "image/webp", "仅支持webp格式")
		.refine((f) => f.size < 5 * 1024 * 1024, "文件大小不能超过5MB"),
});

converterRouter.post(
	"/",
	zValidator("form", schema),
	async (c) => {
		console.log('请求到达');
		
		const { file } = c.req.valid("form");
		try {
			const buffer = Buffer.from(await file.arrayBuffer());
			const convertedUrl = await converterService.webpToJpeg(buffer);
			console.log(convertedUrl);
			
			return c.json({
				original: file.name,
				convertedUrl,
			});
		} catch (error) {
			return c.json({ err: "文件处理失败" }, 500);
		}
	},
);
export default converterRouter;
