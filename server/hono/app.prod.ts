// 生产环境启动文件
import { Hono } from "hono";
import converter from "./routes/image-converter/index";
import { cors } from "hono/cors";
import hello from "./routes/hello/index";
import cleanup from "./routes/cleanup/index";
import { serve } from "@hono/node-server";
import { CleanupService } from "@server/core/services/cleanup.service";
const app = new Hono().basePath("/api");
app.use("*", cors());

app.route("/converter", converter);
app.route("/hello", hello);
app.route("/cleanup", cleanup);

app.get("/health", (c) => c.text("OK"));

const port = Number.parseInt(process.env.HONO_PORT || "3001", 10);

const server = serve(
	{
		fetch: app.fetch,
		port,
		hostname: "0.0.0.0",
	},
	(info) => {
		console.log(`Hono服务运行在 http://0.0.0.0:${info.port}`);

		// 启动定时清理服务
		const cleanupService = new CleanupService();
		cleanupService.startCleanupService();
	},
);

// 优雅关闭
const gracefulShutdown = (signal: string) => {
	console.log(`收到 ${signal} 信号，开始优雅关闭...`);
	server.close(() => {
		console.log("服务器已关闭");
		process.exit(0);
	});
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

export default {
	port,
	fetch: app.fetch,
};
