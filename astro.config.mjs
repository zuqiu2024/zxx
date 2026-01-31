import { defineConfig } from 'astro/config';
// 注释掉 cloudflare 适配器导入
// import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  // 关键：改为 'static'
  output: 'static',
  // 关键：注释掉适配器配置
  // adapter: cloudflare(),
});