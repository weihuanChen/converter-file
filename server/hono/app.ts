// app.ts
import { Hono } from "hono";
import converter from "./routes/image-converter/index";
import { cors } from "hono/cors";
import hello from "./routes/hello/index";
import cleanup from "./routes/cleanup/index";
import { serve } from "@hono/node-server";
import { CleanupService } from "@server/core/services/cleanup.service";

// import { cors } from 'hono/cors'
const app = new Hono().basePath("/api");
// 必须在所有路由之前注册 CORS
app.use("*", cors());

app.route("/converter", converter);
app.route("/hello", hello);
app.route("/cleanup", cleanup);
app.get("/health", (c) => c.text("OK"));

// 获取端口，支持环境变量
const port = Number.parseInt(process.env.PORT || "3001", 10);




// pm2 cluster 模式

export default app;
