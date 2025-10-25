// app/robots.txt/route.js
export async function GET() {
    const robots = `
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://thecareerowl.ca/sitemap.xml
`.trim()

    return new Response(robots, {
        headers: {
            'Content-Type': 'text/plain',
        },
    })
}