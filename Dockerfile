# 构建阶段
FROM node:20-alpine AS builder

# 安装构建依赖
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    vips-dev \
    pkgconfig

WORKDIR /app

# 复制package文件
COPY package*.json ./

# 安装所有依赖（包括devDependencies）
RUN npm ci

# 复制源代码
COPY . .

# 构建Next.js应用
RUN npm run build

# 构建Hono应用（如果需要）
RUN npm run build:hono

# 生产阶段
FROM node:20-alpine AS production

# 安装运行时依赖
RUN apk add --no-cache \
    vips \
    dumb-init

# 创建非root用户
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app

# 从构建阶段复制必要文件
COPY --from=builder --chown=nextjs:nodejs /app/next.config.ts ./
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/server ./server
COPY --from=builder --chown=nextjs:nodejs /app/messages ./messages

# 只安装生产依赖
RUN npm ci --only=production && npm cache clean --force

# 创建必要的目录
RUN mkdir -p public/converted && chown -R nextjs:nodejs public/converted

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=3000
ENV HONO_PORT=3001

# 暴露端口
EXPOSE 3000 3001

# 切换到非root用户
USER nextjs

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# 使用dumb-init启动
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "run", "start:docker"] 