// lib/config.ts
type Environment = 'development' | 'production' | 'test';

// 定义每个环境的配置结构
interface EnvironmentConfig {
  apiBaseUrl: string;
  pythonServiceUrl: string;
  // 可扩展其他配置项
}

// 所有环境的完整配置
const configs: Record<Environment, EnvironmentConfig> = {
  development: {
    apiBaseUrl: 'http://localhost:3000/api',
    pythonServiceUrl: 'http://localhost:8000',
  },
  production: {
    apiBaseUrl: 'https://yourdomain.com/api',
    pythonServiceUrl: 'https://api.yourdomain.com',
  },
  test: { // 测试环境配置
    apiBaseUrl: 'http://test:3000/api',
    pythonServiceUrl: 'http://test:8000',
  },
} as const; // 使用 as const 锁定类型

// 获取当前环境（带类型守卫）
const getCurrentEnv = (): Environment => {
  const env = process.env.NODE_ENV;
  if (env === 'development' || env === 'production' || env === 'test') {
    return env;
  }
  return 'development'; // 默认值
};

// 导出当前环境配置
export const config: EnvironmentConfig = configs[getCurrentEnv()];