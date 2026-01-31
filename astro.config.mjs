import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  // 1. 确保输出模式是 'server' 或 'hybrid'
  output: 'server',
  
  // 2. 配置适配器
  adapter: cloudflare(),
  
  // 3. 【关键】显式禁用可能导致问题的实验性图片优化服务
  image: {
    service: undefined // 明确设置为 undefined，禁用内置图片服务
  }
});