import { defineConfig } from 'astro/config';

// 这是一个最小化诊断配置
export default defineConfig({
  // 保持静态模式，与我们诊断目标一致
  output: 'static',
  
  // 关键：暂时注释或移除 ALL integrations (集成项)
  // integrations: [],

  // 关键：明确不配置任何图片服务
  // image: { service: undefined }
});