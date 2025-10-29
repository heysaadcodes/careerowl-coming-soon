// lib/emailService.js
export const emailService = {
    sendEarlyAccessEmails: async (submission) => {
        try {
            console.log('Sending emails via API route for:', submission.email);

            const response = await fetch(`/api/send-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: submission.name,
                    email: submission.email,
                    company: submission.company,
                    focusIndustry: submission.focusIndustry
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to send emails');
            }

            return {
                userEmail: {
                    success: true,
                    messageId: result.userMessageId
                },
                adminEmail: {
                    success: true,
                    messageId: result.adminMessageId
                }
            };
        } catch (error) {
            console.error('Error in email service:', error);
            return {
                userEmail: { success: false, error: error.message },
                adminEmail: { success: false, error: error.message }
            };
        }
    }
};