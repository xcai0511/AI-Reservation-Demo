import pool from '../db/index.js';

export const generateDailySlots = async (dateStr) => {
    const existing = await pool.query(
        `SELECT COUNT(*) FROM slot_availability WHERE reservation_date = $1`,
        [dateStr]
    );

    if (parseInt(existing.rows[0].count) > 0) {
        console.log(`Slots already exist for ${dateStr}, skipping generation.`);
        return;
    }

    const times = [
        "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"
    ];

    const values = times.map(time => `('${dateStr}', '${time}', 0, 40)`).join(',');

    await pool.query(`INSERT INTO slot_availability (reservation_date, reservation_time, seats_booked, max_capacity) VALUES ${values}`);

    console.log(`Slots generated for ${dateStr}`);
};
