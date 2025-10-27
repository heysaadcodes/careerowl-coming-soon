import { NextResponse } from 'next/server'

export async function POST(request) {
    try {
        const { token } = await request.json()

        if (!token) {
            return NextResponse.json(
                { success: false, error: 'No token provided' },
                { status: 400 }
            )
        }

        // Verify the token with Cloudflare
        const formData = new FormData()
        formData.append('secret', process.env.TURNSTILE_SECRET_KEY)
        formData.append('response', token)

        const response = await fetch(
            'https://challenges.cloudflare.com/turnstile/v0/siteverify',
            {
                method: 'POST',
                body: formData,
            }
        )

        const data = await response.json()

        if (data.success) {
            return NextResponse.json({ success: true })
        } else {
            console.error('Turnstile verification failed:', data['error-codes'])
            return NextResponse.json(
                {
                    success: false,
                    error: 'Verification failed',
                    errorCodes: data['error-codes']
                },
                { status: 400 }
            )
        }
    } catch (error) {
        console.error('Turnstile verification error:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}