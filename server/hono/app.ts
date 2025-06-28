// app.ts
import { Hono } from "hono";
import converter from "./routes/image-converter/index";
import { cors } from "hono/cors";
import hello from "./routes/hello/index";
import { serve } from "@hono/node-server";
import cleanup from "./routes/cleanup";
import { CleanupService } from "@server/core/services/cleanup.service";

// import { cors } from 'hono/cors
const app = new Hono().basePath("/api");
// 必须在所有路由之前注册 CORS
app.use("*", cors());

app.route("/converter", converter);
app.route("/hello", hello);
app.route("/cleanup", cleanup);
app.get("/health", (c) => c.text("OK"));
const port = 3001;
const server = serve(
	{
		fetch: app.fetch,
		port,
	},
	(info) => {
		console.log(`Hono服务运行在 http://localhost:${info.port}`);
		// 启动定时清理服务
		const cleanupService = new CleanupService();
		cleanupService.startCleanupService();
	},
);
process.on("SIGINT", () => {
	server.close();
	process.exit(0);
});
process.on("SIGTERM", () => {
	server.close((err) => {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		process.exit(0);
	});
});
// 开发环境下直接启动，生产环境使用PM2
if (process.env.NODE_ENV !== "production") {
	server;
}
// pm2 cluster 模式

export default {
	port,
	fetch: app.fetch,
};
