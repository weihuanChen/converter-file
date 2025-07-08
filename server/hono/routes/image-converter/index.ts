import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { ImageConverterService } from "../../../core/services/image-converter.service";
import { z } from "zod";

const converterRouter = new Hono();
const converterService = new ImageConverterService();
// 支持的格式
const allowedInputTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];
const allowedTargetFormats = ["jpg", "png", "webp"];
// 定义 Zod 验证 schema
const schema = z.object({
  file: z
    .instanceof(File, { message: "请上传有效文件" })
    .refine((f) => allowedInputTypes.includes(f.type), "仅支持png、jpg、jpeg、webp格式")
    .refine((f) => f.size < 5 * 1024 * 1024, "文件大小不能超过5MB"),
  targetFormat: z.string().refine((val) => allowedTargetFormats.includes(val), "目标格式不合法"),
});

converterRouter.post(
  "/",
  zValidator("form", schema),
  async (c) => {
    const { file, targetFormat } = c.req.valid("form");
    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      const convertedUrl = await converterService.convert(buffer, targetFormat as "jpg" | "png" | "webp");
      return c.json({
        original: file.name,
        convertedUrl,
      });
    } catch (error) {
      return c.json({ err: error instanceof Error ? error.message : "文件处理失败" }, 500);
    }
  },
);
export default converterRouter;
