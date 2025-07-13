import pool from '../db/index.js';
import { generateDailySlots } from '../utils/generateSlots.js';

// for user reservation
export const getAvailableSlotsByDate = async (req, res) => {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: "Date is required" });

    try {
        const result = await pool.query(
            `SELECT * FROM slot_availability WHERE reservation_date = $1 AND is_blocked = false ORDER BY reservation_time`,
            [date]
        );

        if (result.rows.length === 0) {
            await generateDailySlots(date);
            const regenerated = await pool.query(
                `SELECT * FROM slot_availability WHERE reservation_date = $1 AND is_blocked = false ORDER BY reservation_time`,
                [date]
            );
            return res.json(regenerated.rows);
        }

        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching available slots:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
// for admin portal
export const getAllSlotsByDate = async (req, res) => {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: "Date is required" });

    try {
        const result = await pool.query(
            `SELECT * FROM slot_availability WHERE reservation_date = $1 ORDER BY reservation_time`,
            [date]
        );

        if (result.rows.length === 0) {
            await generateDailySlots(date);
            const regenerated = await pool.query(
                `SELECT * FROM slot_availability WHERE reservation_date = $1 ORDER BY reservation_time`,
                [date]
            );
            return res.json(regenerated.rows);
        }

        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching slots:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const blockSlot = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            `UPDATE slot_availability SET is_blocked = true WHERE id = $1 RETURNING *`,
            [id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: "Slot not found" });
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error blocking slot:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const unblockSlot = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            `UPDATE slot_availability SET is_blocked = false WHERE id = $1 RETURNING *`,
            [id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: "Slot not found" });
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error unblocking slot:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const blockAllSlotsByDate = async (req, res) => {
    const { date } = req.body;
    if (!date) return res.status(400).json({ error: "Date is required" });

    try {
        const result = await pool.query(
            `UPDATE slot_availability SET is_blocked = true WHERE reservation_date = $1 RETURNING *`,
            [date]
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Error blocking all slots:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const unblockAllSlotsByDate = async (req, res) => {
    const { date } = req.body;
    if (!date) return res.status(400).json({ error: "Date is required" });

    try {
        const result = await pool.query(
            `UPDATE slot_availability SET is_blocked = false WHERE reservation_date = $1 RETURNING *`,
            [date]
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Error unblocking all slots:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

