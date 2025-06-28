import { Hono } from "hono";
import { CleanupService } from "../../../core/services/cleanup.service";
import { success } from "zod/v4";
const cleanupService = new CleanupService();
const cleanupRouter = new Hono();
// 启动定时清理
cleanupRouter.post("/start", (c) => {
	try {
		cleanupService.startCleanupService();
		return c.json({ message: "Cleanup service started", success: true }, 200);
	} catch (error) {
		return c.json(
			{ message: "Cleanup service failed to start", success: false },
			500,
		);
	}
});
cleanupRouter.get("/status", (c) => {
	try {
		cleanupService.startCleanupService();
		return c.json({ message: "Cleanup service started", success: true }, 200);
	} catch (error) {
		return c.json(
			{ message: "Cleanup service failed to get status", success: false },
			500,
		);
	}
});
// 停止
cleanupRouter.post("/stop", (c) => {
	try {
		cleanupService.stopCleanupService();
		return c.json({ message: "Cleanup service stopped", success: true }, 200);
	} catch (error) {
		return c.json(
			{ message: "Cleanup service failed to stop", success: false },
			500,
		);
	}
});
// 手动触发
cleanupRouter.post("/manual", (c) => {
	try {
		cleanupService.manualCleanup();
		return c.json({ message: "Cleanup service triggered", success: true }, 200);
	} catch (error) {
		return c.json(
			{ message: "Cleanup service failed to trigger", success: false },
			500,
		);
	}
});
export default cleanupRouter;
