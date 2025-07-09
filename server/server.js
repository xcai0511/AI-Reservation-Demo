const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { port } = require('./config');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/ping', (req, res) => {
    res.json({ message: 'pong from server' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});