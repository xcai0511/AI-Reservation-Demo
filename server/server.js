const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { port } = require('./config');
const reservationRoutes = require("./routes/reservationRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/reservations', reservationRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});