const axios = require('axios');
const client = require('../utils/elasticsearch');

const syncEmails = async (accessToken, userId) => {
    try {
        const response = await axios.get('https://graph.microsoft.com/v1.0/me/messages', {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        const emails = response.data.value;

        for (const email of emails) {
            await client.index({
                index: 'emails',
                body: {
                    local_id: userId,
                    subject: email.subject,
                    sender: email.from.emailAddress.address,
                    body: email.body.content,
                    receivedDateTime: email.receivedDateTime
                }
            });
        }

        console.log('Emails synced successfully for user:', userId);
    } catch (error) {
        console.error('Error syncing emails:', error);
        throw error;
    }
};

module.exports = {
    syncEmails
};
