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
      subject: 'Welcome to the Future of Hiring in Canada – CareerOwl™ Early Access',
      html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8f9fa; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: #78355e; color: white; padding: 40px 20px; text-align: center; }
        .content { padding: 40px 30px; }
        .footer { background: #f1f3f4; padding: 25px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #ddd; }
        .highlight { color: #78355e; font-weight: bold; }
        .feature-list { margin: 25px 0; padding-left: 20px; }
        .feature-item { margin-bottom: 12px; position: relative; }
        .signature { margin-top: 30px; font-style: italic; }
        .cta-box { background: #bdff00; color: #78355e; padding: 20px; border-radius: 8px; text-align: center; margin: 25px 0; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>CareerOwl™</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">Welcome to the Future of Hiring in Canada</p>
        </div>
        <div class="content">
            <h2>Hello ${name},</h2>
            
            <p>Thank you for joining the Early Access list for CareerOwl™. You are now part of something truly new in Canada: the first job platform built from the ground up to serve Canadian applicants, employers, and recruiters.</p>
            
            <div class="cta-box">
                Launching January 2026
            </div>
            
            <p><strong>CareerOwl™ is not just another job board.</strong> It is a smarter, fairer, and more transparent ecosystem designed to make every step of hiring and applying easier. As one of our early supporters, you'll soon be among the first to experience features like:</p>
            
            <ul class="feature-list">
                <li class="feature-item"><strong>Guided job postings</strong> with Canadian NOC alignment and wage insights</li>
                <li class="feature-item"><strong>AI-powered resume match scoring</strong> and improvement tips</li>
                <li class="feature-item"><strong>Verified employer and recruiter accounts</strong> for safety and trust</li>
                <li class="feature-item"><strong>Multi-user dashboards</strong> with recruiter mode and dual branding</li>
                <li class="feature-item"><strong>Application tracking</strong> with real-time status updates</li>
                <li class="feature-item"><strong>Fraud detection tools</strong> and anonymous application options</li>
                <li class="feature-item"><strong>Affordable pricing</strong> that makes fair hiring accessible to all</li>
            </ul>
            
            <p>This is more than a platform. It is a new way of connecting Canadians with opportunities, with clarity and trust at its core.</p>
            
            <p>We cannot wait to share the full experience with you when we launch in <strong>January 2026</strong>. Until then, watch your inbox for exclusive updates, sneak peeks, and early invitations.</p>
            
            <p>The owl is taking flight, and you are part of the journey.</p>
            
            <div class="signature">
                <p><strong>Wise Choices, Bright Careers.</strong><br>
                The CareerOwl™ Team</p>
            </div>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} CareerOwl™. All rights reserved.</p>
            <p>You're receiving this email because you signed up for early access at CareerOwl™.</p>
        </div>
    </div>
</body>
</html>
            `,
      text: `Welcome to the Future of Hiring in Canada – CareerOwl™ Early Access

Hello ${name},

Thank you for joining the Early Access list for CareerOwl™. You are now part of something truly new in Canada: the first job platform built from the ground up to serve Canadian applicants, employers, and recruiters.

CareerOwl™ is not just another job board. It is a smarter, fairer, and more transparent ecosystem designed to make every step of hiring and applying easier. As one of our early supporters, you'll soon be among the first to experience features like:

• Guided job postings with Canadian NOC alignment and wage insights
• AI-powered resume match scoring and improvement tips
• Verified employer and recruiter accounts for safety and trust
• Multi-user dashboards with recruiter mode and dual branding
• Application tracking with real-time status updates
• Fraud detection tools and anonymous application options
• Affordable pricing that makes fair hiring accessible to all

This is more than a platform. It is a new way of connecting Canadians with opportunities, with clarity and trust at its core.

We cannot wait to share the full experience with you when we launch in January 2026. Until then, watch your inbox for exclusive updates, sneak peeks, and early invitations.

The owl is taking flight, and you are part of the journey.

Wise Choices, Bright Careers.
The CareerOwl™ Team`
    };

    // 2. Send notification email to admin (UNCHANGED)
    const adminMailOptions = {
      from: '"CareerOwl™ System" <hoot@thecareerowl.ca>',
      to: process.env.ADMIN_EMAIL || 'info@thecareerowl.ca',
      subject: 'New Early Access Signup - CareerOwl™',
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