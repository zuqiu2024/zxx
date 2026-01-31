import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  // 关键：设置为 'server' 以启用无服务器函数
  output: 'server',
  
  // 关键：配置 Cloudflare 适配器
  adapter: cloudflare(),
  
  // 暂时注释掉所有图片优化、资源等高级配置，先确保构建通过
  // image: {
  //   service: {...}
  // },
  
  // 如果你的项目有需要，可以保留最基础的集成项
  // integrations: [...]
});