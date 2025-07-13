import express from 'express';
import {
    blockSlot,
    unblockSlot,
    getAvailableSlotsByDate,
    getAllSlotsByDate,
    blockAllSlotsByDate,
    unblockAllSlotsByDate
} from '../controllers/slotController.js';

const router = express.Router();

router.get('/available', getAvailableSlotsByDate);
router.get('/', getAllSlotsByDate);
router.patch('/:id/block', blockSlot);
router.patch('/:id/unblock', unblockSlot);
router.patch('/block-all', blockAllSlotsByDate);
router.patch('/unblock-all', unblockAllSlotsByDate);

export default router;
