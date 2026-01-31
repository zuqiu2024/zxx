export const prerender = false;

export async function POST({ request }) {
  try {
    const { code } = await request.json();
    
    // 环境变量从Cloudflare设置
    const CLIENT_ID = import.meta.env.GITHUB_CLIENT_ID;
    const CLIENT_SECRET = import.meta.env.GITHUB_CLIENT_SECRET;

    // 向GitHub请求token
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        redirect_uri: 'https://zhanxx81201.dpdns.org/api/auth'
      }),
    });

    const data = await response.json();
    
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: '服务器错误' }), { status: 500 });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS'
    }
  });
}