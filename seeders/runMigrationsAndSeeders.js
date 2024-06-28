const { Client } = require('@elastic/elasticsearch');
const config = require('../config/config');
const client = new Client({ node: config.elasticsearchHost });

const createEmailIndices = async () => {
    try {
        const exists = await client.indices.exists({ index: 'emails' });

        if (!exists.body) {
            await client.indices.create({
                index: 'emails',
                body: {
                    mappings: {
                        properties: {
                            local_id: { type: 'keyword' },
                            subject: { type: 'text' },
                            sender: { type: 'keyword' },
                            body: { type: 'text' },
                            receivedDateTime: { type: 'date' }
                        }
                    }
                }
            });
            console.log('Created emails index');
        } else {
            console.log('Emails index already exists');
        }
    } catch (error) {
        console.error('Error creating email indices:', error);
    }
};

const seedEmailData = async () => {
    try {
        // Example seed data
        const emails = [
            {
                local_id: 'user_1',
                subject: 'Welcome to our service!',
                sender: 'welcome@service.com',
                body: 'Thank you for joining our service.',
                receivedDateTime: new Date().toISOString()
            },
            {
                local_id: 'user_2',
                subject: 'Your order has been shipped',
                sender: 'orders@shop.com',
                body: 'Your order has been shipped and is on its way.',
                receivedDateTime: new Date().toISOString()
            }
        ];

        for (const email of emails) {
            await client.index({
                index: 'emails',
                body: email
            });
        }

        console.log('Seeded email data');
    } catch (error) {
        console.error('Error seeding email data:', error);
    }
};

// Run migrations and seeders
createEmailIndices();
seedEmailData();
