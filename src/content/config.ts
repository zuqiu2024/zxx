import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  // 核心配置：必须为 'server' 或 'hybrid' 以支持 API
  output: 'server',
  
  // 核心配置：启用适配器
  adapter: cloudflare(),
  
  // 【尝试方案一】：完全不配置 `image` 对象（有些情况下更有效）
  // （即，删除或注释掉整个 `image: { ... }` 部分）

  // 【尝试方案二】：更明确地禁用所有实验性资源功能
  experimental: {
    // 尝试禁用可能会引起冲突的实验性功能
    assets: false // 这是 Astro 5.x 中的一个实验性功能标志
  }
});