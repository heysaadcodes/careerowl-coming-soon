// app/metadata.js
export const metadata = {
    title: {
        default: 'CareerOwl - Wise Choices, Bright Careers | Canada\'s leading recruitment tool for Job Seekers, Employers and Recruiters',
        template: '%s | CareerOwl'
    },
    description: 'CareerOwl is launching soon! Get early access to our innovative AI-powered career development platform. Transform your professional journey with smart career guidance.',
    keywords: 'career development, AI career platform, job search, professional growth, career guidance, early access, launching soon',
    authors: [{ name: 'CareerOwl Team' }],
    creator: 'CareerOwl',
    publisher: 'CareerOwl',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://thecareerowl.ca'),
    alternates: {
        canonical: 'https://thecareerowl.ca',
    },
    openGraph: {
        title: 'CareerOwl - Wise Choices, Bright Careers | Canada\'s leading recruitment tool for Job Seekers, Employers and Recruiters',
        description: 'Get early access to our innovative AI-powered career development platform. Transform your professional journey.',
        url: 'https://thecareerowl.ca',
        siteName: 'CareerOwl',
        images: [
            {
                url: '/new-owl-logo.svg',
                width: 1200,
                height: 630,
                alt: 'CareerOwl - Launching Soon',
            },
        ],
        locale: 'en_CA',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'CareerOwl - Wise Choices, Bright Careers | Canada\'s leading recruitment tool for Job Seekers, Employers and Recruiters',
        description: 'Get early access to our innovative AI-powered career development platform.',
        images: ['/new-owl-logo.svg'],
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
        google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png',
    },
}