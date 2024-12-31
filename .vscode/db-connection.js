// const cassandra = require('cassandra-driver');
// const path = require('path');

// // Create a connection to your Astra DB
// const client = new cassandra.Client({
//     cloud: { secureConnectBundle: path.resolve(__dirname, 'https://c55e936e-49e4-4de8-8647-9c752314bdf6-us-east-2.apps.astra.datastax.com') },
//     keyspace: 'social_media', // Replace with your keyspace name
// });

// // Function to initialize the connection
// async function connect() {
//     try {
//         await client.connect();
//         console.log('Connected to DataStax Astra DB!');
//     } catch (error) {
//         console.error('Failed to connect to DataStax Astra DB:', error);
//     }
// }

// module.exports = { client, connect };


const cassandra = require('cassandra-driver');
const path = require('path');

// Initialize Cassandra client
const client = new cassandra.Client({
    cloud: { secureConnectBundle: path.resolve(__dirname, 'https://c55e936e-49e4-4de8-8647-9c752314bdf6-us-east-2.apps.astra.datastax.com') },
    keyspace: 'social_media', // Replace with your keyspace name
});

// Function to test the connection and run a query
async function connectAndTest() {
    try {
        await client.connect();
        console.log('Connected to Astra DB!');

        // Test query: Select data from system.local table
        const result = await client.execute('SELECT release_version FROM system.local');
        console.log('Database Version:', result.rows[0].release_version);
    } catch (error) {
        console.error('Error connecting or querying the database:', error);
    } finally {
        await client.shutdown(); // Close the connection when done
    }
}

module.exports = { client, connectAndTest };

