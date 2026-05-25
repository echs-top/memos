export default {
  async fetch(request, env, ctx) {
    // 跨域
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
    };
    // OPTIONS预检请求
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }
    try {
      // From global binding assets
      const response = await env.ASSETS.fetch(request);

      if (response.status === 404) {
        return new Response("File not found", { status: 404 });
      }
      const newResponse = new Response(response.body, response);
      Object.keys(corsHeaders).forEach(key => {
        newResponse.headers.set(key, corsHeaders[key]);
      });
      return newResponse;
    } catch (e) {
      return new Response("Internal Server Error", { status: 500 });
    }
  }
};
