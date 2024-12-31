const express = require('express');
const multer = require('multer');
const { Client } = require('cassandra-driver');
const upload = multer({ dest: 'uploads/' });

const app = express();

const client = new Client({
    cloud: { secureConnectBundle: './secure-connect-database_name.zip' },
});

app.post('/upload', upload.single('file'), async (req, res) => {
    const filePath = req.file.path;
    try {
        await client.connect();
        // Process CSV and insert into DataStax
        res.json({ success: true, message: 'Data uploaded successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Upload failed' });
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
