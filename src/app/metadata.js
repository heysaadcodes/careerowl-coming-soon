// app/metadata.js
export const metadata = {
    title: {
        default: 'Career Owl - AI-Powered Career Platform Launching Soon',
        template: '%s | Career Owl'
    },
    description: 'Career Owl is launching soon! Get early access to our innovative AI-powered career development platform. Transform your professional journey with smart career guidance.',
    keywords: 'career development, AI career platform, job search, professional growth, career guidance, early access, launching soon',
    authors: [{ name: 'Career Owl Team' }],
    creator: 'Career Owl',
    publisher: 'Career Owl',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://thecareerowl.ca'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'Career Owl - AI-Powered Career Platform Launching Soon',
        description: 'Get early access to our innovative AI-powered career development platform. Transform your professional journey.',
        url: 'https://thecareerowl.ca',
        siteName: 'Career Owl',
        images: [
            {
                url: '/og-image.jpg', // You'll need to create this
                width: 1200,
                height: 630,
                alt: 'Career Owl - Launching Soon',
            },
        ],
        locale: 'en_CA',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Career Owl - AI-Powered Career Platform Launching Soon',
        description: 'Get early access to our innovative AI-powered career development platform.',
        images: ['/og-image.jpg'],
        creator: '@careerowl',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION, // Add your verification code
    },
}