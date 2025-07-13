import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { port } from './config.js';
import reservationRoutes from "./routes/reservationRoutes.js";
import cron from 'node-cron';
import { generateDailySlots } from './utils/generateSlots.js';
import slotRoutes from "./routes/slotRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/reservations', reservationRoutes);
app.use('/api/slots', slotRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// 💡 Run the cron job to auto-generate time slots for tomorrow
cron.schedule('0 3 * * *', async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().slice(0, 10); // "YYYY-MM-DD"
    await generateDailySlots(dateStr);
});