#!/bin/bash

# 构建脚本
set -e

echo "开始构建文件转换服务..."

# 检查Node.js版本
NODE_VERSION=$(node -v)
echo "Node.js版本: $NODE_VERSION"

# 清理之前的构建
echo "清理之前的构建..."
rm -rf .next
rm -rf server/dist
rm -rf public/converted/*

# 安装依赖
echo "安装依赖..."
npm ci

# 构建Next.js应用
echo "构建Next.js应用..."
npm run build

# 构建Hono服务
echo "构建Hono服务..."
npm run build:hono

# 创建生产环境目录
echo "创建生产环境目录..."
mkdir -p dist
cp -r .next dist/
cp -r server/dist dist/server/
cp -r public dist/
cp -r messages dist/
cp package*.json dist/
cp next.config.ts dist/
cp server/tsconfig.json dist/

# 创建启动脚本
cat > dist/start.sh << 'EOF'
#!/bin/bash
cd /app
npm ci --only=production
npm run start:docker
EOF

chmod +x dist/start.sh

echo "构建完成！"
echo "构建产物位于: ./dist" 