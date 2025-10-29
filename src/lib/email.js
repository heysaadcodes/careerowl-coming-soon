import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

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
    }
};

console.log('Email configuration loaded.',emailConfig);

// Create transporter
const transporter = nodemailer.createTransport(emailConfig);

// Verify transporter configuration
transporter.verify((error) => {
    if (error) {
        console.error('Email transporter verification failed:', error.message);
    }
    // else {
    //     console.log('Email transporter is ready to send messages');
    // }
});

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
        to: process.env.ADMIN_EMAIL,
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

// Email service
export const emailService = {
    sendUserConfirmation: async (name, email) => {
        try {
            const mailOptions = emailTemplates.userConfirmation(name, email);
            const result = await transporter.sendMail(mailOptions);
            // console.log('User confirmation email sent to:', email);
            return { success: true, messageId: result.messageId, email };
        } catch (error) {
            console.error('Error sending user confirmation email:', error.message);
            return { success: false, error: error.message, email };
        }
    },

    sendAdminNotification: async (submission) => {
        try {
            const mailOptions = emailTemplates.adminNotification(submission);
            const result = await transporter.sendMail(mailOptions);
            // console.log('Admin notification email sent');
            return { success: true, messageId: result.messageId };
        } catch (error) {
            console.error('Error sending admin notification email:', error.message);
            return { success: false, error: error.message };
        }
    },

    sendEarlyAccessEmails: async (submission) => {
        // console.log('Starting email sequence for:', submission.email);

        const results = {
            userEmail: await emailService.sendUserConfirmation(submission.name, submission.email),
            adminEmail: await emailService.sendAdminNotification(submission)
        };

        // console.log('Email sequence completed');
        return results;
    }
};

export default transporter;