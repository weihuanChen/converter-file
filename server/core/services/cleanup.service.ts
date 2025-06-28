import { ImageConverterService } from "./image-converter.service";

export class CleanupService {
	private readonly imageConverterService: ImageConverterService;
	private cleanupInterval: NodeJS.Timeout | null = null;
	private readonly CLEANUP_INTERVAL_MS = 1000 * 60 * 60 * 24; // 24小时
	private readonly MAX_FILE_AGE = 2 * 60 * 60 * 1000; // 2小时
	constructor() {
		this.imageConverterService = new ImageConverterService();
	}
	/**
	 * 启动定时清理服务
	 */
	startCleanupService() {
		console.log("start cleanup service");
		this.performCleanup();
		// 设置定期清理任务
		this.cleanupInterval = setInterval(() => {
			this.performCleanup();
		}, this.CLEANUP_INTERVAL_MS);
		console.log(
			`cleanup service started, cleanup interval: ${this.CLEANUP_INTERVAL_MS}ms`,
		);
	}
	/**
	 * 清理操作
	 */
	private async performCleanup() {
		try {
			const beforeCount =
				await this.imageConverterService.getConvertedFilesCount();
			if (beforeCount > 0) {
				await this.imageConverterService.cleanupConvertedFiles();
				const afterCount =
					await this.imageConverterService.getConvertedFilesCount();
				console.log(
					`cleanup completed, before: ${beforeCount}, after: ${afterCount}`,
				);
			} else {
				console.log("no converted files to cleanup");
			}
		} catch (error) {
			console.error(`cleanup failed: ${error}`);
		}
	}
	/**
	 * 停止定时清理服务
	 */
	stopCleanupService() {
		if (this.cleanupInterval) {
			clearInterval(this.cleanupInterval);
			this.cleanupInterval = null;
			console.log("cleanup service stopped");
		}
	}
	/**
	 * 手动清理
	 */
	async manualCleanup() {
		try {
			await this.performCleanup();
		} catch (error) {
			console.error(`manual cleanup failed: ${error}`);
		}
	}
  getStatus(){
    return{
      isRunning: this.cleanupInterval !== null,
      interval: this.CLEANUP_INTERVAL_MS,
      nextCleanup: this.cleanupInterval ? new Date(Date.now() + this.CLEANUP_INTERVAL_MS).toISOString() : null,
    }
  }
}
