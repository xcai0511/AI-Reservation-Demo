import express from 'express';
import {
    blockSlot,
    unblockSlot,
    getAvailableSlotsByDate,
    getAllSlotsByDate
} from '../controllers/slotController.js';

const router = express.Router();

router.get('/available', getAvailableSlotsByDate);
router.get('/', getAllSlotsByDate);
router.patch('/:id/block', blockSlot);
router.patch('/:id/unblock', unblockSlot);

export default router;
