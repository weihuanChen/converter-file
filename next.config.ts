import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "node:path";
// 兼容i18n 类型增强
type CustomExperimentalConfig = {
	createMessagesDeclaration?: string | string[];
	// 可以添加其他自定义实验性配置
};
const nextConfig: NextConfig & {
	experimental?: CustomExperimentalConfig;
} = {
	/* config options here */
	devIndicators: false,
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: "http://localhost:3001/api/:path*", // 直连Hono服务
			},
		];
	},
};
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
