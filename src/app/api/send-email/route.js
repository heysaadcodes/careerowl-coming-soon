// app/api/send-email/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const { name, email, company, focusIndustry } = await request.json();

        console.log('Attempting to send emails for:', email);

        // Create a fresh transporter for each request
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT || '465'),
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false,
                ciphers: 'SSLv3'
            },
            connectionTimeout: 10000,
            greetingTimeout: 10000,
            socketTimeout: 10000,
        });

        // Verify connection
        await transporter.verify();

        // 1. Send confirmation email to user
        const userMailOptions = {
            from: '"CareerOwl™" <hoot@thecareerowl.ca>',
            to: email,
            subject: 'Welcome to CareerOwl™ Early Access!',
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8f9fa; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .header { background: #78355e; color: white; padding: 30px 20px; text-align: center; }
            .content { padding: 40px 30px; }
            .footer { background: #f1f3f4; padding: 20px; text-align: center; font-size: 12px; color: #666; }
            .highlight { color: #78355e; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>CareerOwl™</h1>
            </div>
            <div class="content">
              <h2>Welcome to Early Access, ${name}!</h2>
              <p>Thank you for submitting your details for CareerOwl™ early access. We're thrilled to have you join our exclusive community of career pioneers!</p>
              <p><span class="highlight">You're officially on the list!</span> We've added you to our early access participant registry and will contact you via email as we approach our official launch.</p>
              <p><strong>What happens next?</strong></p>
              <ul>
                <li>Exclusive early access to CareerOwl™ platform features</li>
                <li>Priority notification when we launch</li>
                <li>Special early adopter benefits</li>
                <li>Behind-the-scenes development updates</li>
              </ul>
              <p>Our team is working passionately to create an exceptional career development experience that will transform how professionals navigate their career journeys.</p>
              <p>Have questions? Simply reply to this email - we're here to help!</p>
              <p>Welcome aboard,<br><strong>The CareerOwl™ Team</strong></p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} CareerOwl™. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
            text: `Welcome to Early Access, ${name}!\n\nThank you for submitting your details...`
        };

        // 2. Send notification email to admin
        const adminMailOptions = {
            from: '"CareerOwl™ System" <hoot@thecareerowl.ca>',
            to: process.env.ADMIN_EMAIL || 'info@thecareerowl.ca',
            subject: '🎉 New Early Access Signup - CareerOwl™',
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8f9fa; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .header { background: #78355e; color: white; padding: 20px; text-align: center; }
            .content { padding: 30px; }
            .info-box { background: #f1f3f4; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .highlight { color: #78355e; font-weight: bold; }
            .field { margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Early Access Signup!</h2>
            </div>
            <div class="content">
              <h3>A new user has joined CareerOwl™ Early Access!</h3>
              
              <div class="info-box">
                <div class="field"><strong>Name:</strong> ${name}</div>
                <div class="field"><strong>Email:</strong> ${email}</div>
                <div class="field"><strong>Company:</strong> ${company || 'Not provided'}</div>
                <div class="field"><strong>Focus Industry:</strong> ${focusIndustry || 'Not provided'}</div>
              </div>
              
              <p><span class="highlight">Total early access participants are growing!</span></p>
              <p>This user has been automatically added to our early access list and will receive platform updates as we approach launch.</p>
              
              <p><strong>Next Steps:</strong></p>
              <ul>
                <li>User has received welcome email confirmation</li>
                <li>Added to early access participant database</li>
                <li>Will be notified when platform launches</li>
              </ul>
            </div>
          </div>
        </body>
        </html>
      `,
            text: `New Early Access Signup:\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || 'Not provided'}\nFocus Industry: ${focusIndustry || 'Not provided'}\nSubmitted: ${new Date().toLocaleString()}\n\nTotal early access participants are growing!`
        };

        // Send both emails
        const userResult = await transporter.sendMail(userMailOptions);
        console.log('User email sent successfully:', userResult.messageId);

        const adminResult = await transporter.sendMail(adminMailOptions);
        console.log('Admin email sent successfully:', adminResult.messageId);

        return NextResponse.json({
            success: true,
            userMessageId: userResult.messageId,
            adminMessageId: adminResult.messageId,
            message: 'Both user confirmation and admin notification emails sent successfully'
        });

    } catch (error) {
        console.error('Email error details:', {
            message: error.message,
            code: error.code,
            command: error.command
        });

        return NextResponse.json(
            {
                success: false,
                error: error.message,
                code: error.code
            },
            { status: 500 }
        );
    }
}