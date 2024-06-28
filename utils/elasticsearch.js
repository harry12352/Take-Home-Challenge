const { Client } = require('@elastic/elasticsearch');
const config = require('../config/config'); // Adjust path as per your project

const client = new Client({ node: config.elasticsearchHost });

module.exports = client;
