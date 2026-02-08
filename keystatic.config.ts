// 路径：/keystatic.config.ts
import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: 'zuqiu2024/zxx', // 必须写对
  },
  collections: {
    posts: collection({
      label: '文章',
      path: 'src/content/posts/*',
      slugField: 'title',
      schema: {
        title: fields.slug({ name: { label: '标题' } }),
        pubDate: fields.date({ label: '发布日期' }),
        description: fields.text({ label: '摘要', multiline: true }),
        image: fields.image({
          label: '封面',
          directory: 'src/assets/images/posts',
          publicPath: '../../assets/images/posts/', // 根据 Firefly 结构微调
        }),
        content: fields.markdoc({ label: '正文' }),
      },
    }),
  },
});
