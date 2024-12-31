const express = require('express');
const multer = require('multer');
const { client, connect } = require('./db-connection');
const upload = multer({ dest: 'uploads/' });

const app = express();
const PORT = 3000;

// Connect to Astra DB
connect();

// Endpoint to handle file uploads
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const data = {
            id: 'unique-id', // Generate a unique ID
            content: 'Example content', // Replace with actual data
        };

        // Insert data into your Cassandra table
        await client.execute(
            'INSERT INTO your_table (id, content) VALUES (?, ?)',
            [data.id, data.content]
        );

        res.json({ success: true, message: 'Data uploaded successfully' });
    } catch (error) {
        console.error('Error uploading data:', error);
        res.status(500).json({ success: false, message: 'Failed to upload data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/analysis', async (req, res) => {
    try {
        const result = await client.execute('SELECT * FROM your_table');
        res.json(result.rows); // Send data to the frontend
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch data' });
    }
});
const { connectAndTest } = require('./db-connection');

// Test the database connection
connectAndTest();
