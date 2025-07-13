import express from 'express';
import { getSlotsByDate } from '../controllers/slotController.js';

const router = express.Router();

router.get('/', getSlotsByDate);

export default router;
