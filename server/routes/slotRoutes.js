import express from 'express';
import {
    getSlotsByDate,
    blockSlot,
    unblockSlot
} from '../controllers/slotController.js';

const router = express.Router();

router.get('/', getSlotsByDate);
router.patch('/:id/block', blockSlot);
router.patch('/:id/unblock', unblockSlot);

export default router;
