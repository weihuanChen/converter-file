#!/bin/bash

# 部署脚本
set -e

echo "开始部署文件转换服务..."

# 检查Docker是否安装
if ! command -v docker &> /dev/null; then
    echo "错误: Docker未安装"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "错误: Docker Compose未安装"
    exit 1
fi

# 构建应用
echo "构建应用..."
./scripts/build.sh

# 停止现有容器
echo "停止现有容器..."
docker-compose down

# 构建生产镜像
echo "构建生产Docker镜像..."
docker build -f Dockerfile.prod -t file-converter:prod .

# 启动服务
echo "启动服务..."
docker-compose up -d

# 等待服务启动
echo "等待服务启动..."
sleep 15

# 检查服务状态
echo "检查服务状态..."
docker-compose ps

# 检查健康状态
echo "检查健康状态..."
curl -f http://localhost:3001/api/health || echo "Hono服务未就绪"
curl -f http://localhost:3000 || echo "Next.js服务未就绪"

echo "部署完成！"
echo "服务地址: http://localhost"
echo "API地址: http://localhost/api" 