import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";
import * as fs from "node:fs"; // 仅在构建时有效
import type { APIContext, GetStaticPaths } from "astro";
import satori from "satori";
import sharp from "sharp";
import { removeFileExtension } from "@/utils/url-utils";
import { profileConfig } from "../../config/profileConfig";
import { siteConfig } from "../../config/siteConfig";

export const prerender = true;

export const getStaticPaths: GetStaticPaths = async () => {
    if (!siteConfig.generateOgImages) return [];
    const allPosts = await getCollection("posts");
    return allPosts.filter(post => !post.data.draft).map((post) => ({
        params: { slug: removeFileExtension(post.id) },
        props: { post },
    }));
};

// 字体抓取逻辑保持不变...
async function fetchNotoSansSCFonts() { 
    /* ...同你之前的代码... */ 
    // 注意：这里已经有 fetch 逻辑，优先从网络加载字体是解决 Cloudflare 环境的最佳方案
}

export async function GET({ props }: APIContext<{ post: CollectionEntry<"posts"> }>) {
    const { post } = props;
    const fontsData = await fetchNotoSansSCFonts();

    // 处理头像
    let avatarBase64: string;
    if (profileConfig.avatar?.startsWith("http")) {
        avatarBase64 = profileConfig.avatar;
    } else {
        const avatarPath = `./public${profileConfig.avatar}`;
        const avatarBuffer = fs.readFileSync(avatarPath);
        avatarBase64 = `data:image/png;base64,${avatarBuffer.toString("base64")}`;
    }

    // 处理图标
    let iconPath = `./public/favicon/favicon-dark-192.png`;
    const iconBuffer = fs.readFileSync(iconPath);
    const iconBase64 = `data:image/png;base64,${iconBuffer.toString("base64")}`;

    const template = {
        // ...你的 SVG 模板结构保持不变...
    };

    const svg = await satori(template as any, {
        width: 1200,
        height: 630,
        fonts: [
            { name: "Noto Sans SC", data: fontsData.regular!, weight: 400, style: "normal" },
            { name: "Noto Sans SC", data: fontsData.bold!, weight: 700, style: "normal" }
        ].filter(f => f.data),
    });

    // 使用 sharp 转换为 PNG
    const png = await sharp(Buffer.from(svg)).png().toBuffer();

    return new Response(png, {
        headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=31536000, immutable" },
    });
}