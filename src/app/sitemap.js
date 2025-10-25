// app/sitemap.js
export default function sitemap() {
    const baseUrl = 'https://thecareerowl.ca'

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/blogs`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/admin`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,
        },
    ]
}