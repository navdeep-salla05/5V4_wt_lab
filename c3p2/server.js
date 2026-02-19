const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Environment Variables Demo!');
});

app.get('/config', (req, res) => {
    res.json({
        dbHost: process.env.DB_HOST,
        dbUser: process.env.DB_USER,
        apiKey: process.env.API_KEY
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
