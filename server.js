const express = require('express');
const passport = require('./services/authService'); // Your authentication service
const config = require('./config/config');
const authController = require('./controllers/authController');
const emailController = require('./controllers/emailController');
const app = express();

// Middleware
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/auth/outlook', authController.authenticate);
app.get('/auth/outlook/callback', authController.outlookAuthCallback, authController.redirectAfterLogin);
app.get('/sync', emailController.syncEmails);

// Start server
app.listen(config.app_port, () => {
    console.log(`Server running on port ${config.app_port}`);
});
