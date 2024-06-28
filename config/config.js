require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DATABASE_USERNAME || 'root',
        password: process.env.DATABASE_PASSWORD || '',
        database: process.env.DATABASE || 'email-core-engine',
        host: process.env.DATABASE_HOST || '127.0.0.1',
        dialect: process.env.DIALECT || 'mysql',
        port: process.env.DATABASE_PORT || 3306,
    },
    app_port: process.env.APP_PORT || 3000,
    elasticsearchHost: process.env.ELASTICSEARCH_HOST || 'http://localhost:9200',
    outlookClientId: process.env.OUTLOOK_CLIENT_ID,
    outlookClientSecret: process.env.OUTLOOK_CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI || 'http://localhost:3000/callback',
    sessionSecret: process.env.SESSION_SECRET || 'your_session_secret',
};

