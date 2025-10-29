import nodemailer from 'nodemailer';

// Email Configuration from Environment Variables
const emailConfig = {
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '465'),
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
    // Vercel-specific settings
    socketTimeout: 30000,
    connectionTimeout: 30000,
    greetingTimeout: 30000,
};

// Create transporter with error handling for Vercel
let transporter;
try {
    transporter = nodemailer.createTransport(emailConfig);

    // Verify transporter asynchronously
    transporter.verify().then(() => {
        console.log('Email transporter ready');
    }).catch((error) => {
        console.error('Email transporter verification failed:', error.message);
    });
} catch (error) {
    console.error('Failed to create email transporter:', error.message);
    // Create a dummy transporter that won't crash the app
    transporter = {
        sendMail: async () => {
            console.log('Email service unavailable on Vercel');
            return { messageId: 'dummy-' + Date.now() };
        }
    };
}

// Email templates
export const emailTemplates = {
    userConfirmation: (name, email) => ({
        from: '"CareerOwl™" <hoot@thecareerowl.ca>',
        to: email,
        subject: 'Welcome to CareerOwl™ Early Access!',
        headers: {
            'List-Unsubscribe': `<mailto:unsubscribe@thecareerowl.ca?subject=Unsubscribe&body=Please unsubscribe ${email}>, <https://thecareerowl.ca/unsubscribe?email=${encodeURIComponent(email)}>`,
            'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click'
        },
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
        .button { background: #bdff00; color: #78355e; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; margin: 20px 0; }
        .highlight { color: #78355e; font-weight: bold; }
        .unsubscribe { font-size: 11px; color: #888; margin-top: 20px; }
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
            <div class="unsubscribe">
                <a href="mailto:unsubscribe@thecareerowl.ca?subject=Unsubscribe&body=Please unsubscribe ${email}">Unsubscribe via Email</a> | 
                <a href="https://thecareerowl.ca/unsubscribe?email=${encodeURIComponent(email)}">Unsubscribe via Website</a>
            </div>
        </div>
    </div>
</body>
</html>
        `,
        text: `Welcome to Early Access, ${name}!

Thank you for submitting your details for CareerOwl™ early access. We're thrilled to have you join our exclusive community of career pioneers!

You're officially on the list! We've added you to our early access participant registry and will contact you via email as we approach our official launch.

What happens next?
• Exclusive early access to CareerOwl™ platform features
• Priority notification when we launch  
• Special early adopter benefits
• Behind-the-scenes development updates

Our team is working passionately to create an exceptional career development experience.

Have questions? Simply reply to this email - we're here to help!

Welcome aboard,
The CareerOwl™ Team`
    }),

    adminNotification: (submission) => ({
        from: '"CareerOwl™ System" <hoot@thecareerowl.ca>',
        to: process.env.ADMIN_EMAIL || 'info@thecareerowl.ca',
        subject: 'New Early Access Registration - CareerOwl™',
        html: `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #78355e; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .highlight { background: #bdff00; padding: 2px 5px; border-radius: 3px; }
    </style>
</head>
<body>
    <div class="header">
        <h2>New Early Access Registration</h2>
    </div>
    <div class="content">
        <h3>New participant joined CareerOwl™ early access!</h3>
        <p><strong>Name:</strong> ${submission.name}</p>
        <p><strong>Email:</strong> ${submission.email}</p>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        <br>
        <p>Total early access participants are growing!</p>
    </div>
</body>
</html>
        `
    }),
};

// Email service with Vercel compatibility
export const emailService = {
    sendUserConfirmation: async (name, email) => {
        try {
            // Check if we're in Vercel production and environment variables are set
            if (process.env.VERCEL && (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS)) {
                console.log('Email service not configured on Vercel');
                return { success: true, messageId: 'vercel-dummy', email, note: 'Email simulated in Vercel' };
            }

            const mailOptions = emailTemplates.userConfirmation(name, email);
            const result = await transporter.sendMail(mailOptions);
            console.log('User confirmation email sent to:', email);
            return { success: true, messageId: result.messageId, email };
        } catch (error) {
            console.error('Error sending user confirmation email:', error.message);
            // Don't fail the request, just log the error
            return { success: false, error: error.message, email };
        }
    },

    sendAdminNotification: async (submission) => {
        try {
            // Check if we're in Vercel production and environment variables are set
            if (process.env.VERCEL && (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS)) {
                console.log('Admin notification skipped on Vercel');
                return { success: true, messageId: 'vercel-dummy', note: 'Admin email simulated in Vercel' };
            }

            const mailOptions = emailTemplates.adminNotification(submission);
            const result = await transporter.sendMail(mailOptions);
            console.log('Admin notification email sent');
            return { success: true, messageId: result.messageId };
        } catch (error) {
            console.error('Error sending admin notification email:', error.message);
            return { success: false, error: error.message };
        }
    },

    sendEarlyAccessEmails: async (submission) => {
        console.log('Starting email sequence for:', submission.email);

        const results = {
            userEmail: await emailService.sendUserConfirmation(submission.name, submission.email),
            adminEmail: await emailService.sendAdminNotification(submission)
        };

        console.log('Email sequence completed');
        return results;
    }
};

export default transporter;