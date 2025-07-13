import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { port } from './config.js';
import reservationRoutes from "./routes/reservationRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/reservations', reservationRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});