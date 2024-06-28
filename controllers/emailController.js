const emailService = require('../services/emailService');

exports.syncEmails = async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }

    try {
        await emailService.syncEmails(req.user.accessToken, req.user.profile.id);
        res.send('Emails synced successfully!');
    } catch (error) {
        console.error('Error syncing emails:', error);
        res.status(500).send('Error syncing emails');
    }
};
