// lib/emailService.js
export const emailService = {
    sendEarlyAccessEmails: async (submission) => {
        try {
            console.log('Sending email via API route for:', submission.email);

            const response = await fetch(`${process.env.NEXTAUTH_URL}/api/send-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: submission.name,
                    email: submission.email
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to send email');
            }

            return {
                userEmail: result,
                adminEmail: { success: true, note: 'Admin email skipped in API mode' }
            };
        } catch (error) {
            console.error('Error in email service:', error);
            return {
                userEmail: { success: false, error: error.message },
                adminEmail: { success: false, error: 'Admin email failed' }
            };
        }
    }
};