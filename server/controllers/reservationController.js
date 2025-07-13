import pool from '../db/index.js';

export const createReservation = async (req, res) => {
    const {
        name,
        phone,
        party_size,
        reservation_date,
        reservation_time,
        special_request
    } = req.body;

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const slotResult = await client.query(`
      SELECT * FROM slot_availability
      WHERE reservation_date = $1 AND reservation_time = $2
      FOR UPDATE
    `, [reservation_date, reservation_time]);

        let slot = slotResult.rows[0];

        if (!slot) {
            const insertSlot = await client.query(`
        INSERT INTO slot_availability (reservation_date, reservation_time, seats_booked)
        VALUES ($1, $2, 0)
        RETURNING *
      `, [reservation_date, reservation_time]);
            slot = insertSlot.rows[0];
        }

        if (slot.seats_booked + party_size > slot.max_capacity) {
            await client.query('ROLLBACK');
            return res.status(400).json({ error: 'This time slot is fully booked.' });
        }

        const insertReservation = await client.query(`
      INSERT INTO reservations (name, phone, party_size, reservation_date, reservation_time, special_request)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [name, phone, party_size, reservation_date, reservation_time, special_request]);

        await client.query(`
      UPDATE slot_availability
      SET seats_booked = seats_booked + $1
      WHERE id = $2
    `, [party_size, slot.id]);

        await client.query('COMMIT');
        res.status(201).json(insertReservation.rows[0]);
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error making reservation:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        client.release();
    }
};

export const getAllReservations = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM reservations ORDER BY reservation_date, reservation_time');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getReservationById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM reservations WHERE id = $1', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Reservation not found' });
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching reservation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateReservation = async (req, res) => {
    const { id } = req.params;
    const { name, phone, party_size, reservation_date, reservation_time, special_request } = req.body;
    try {
        const result = await pool.query(
            `UPDATE reservations SET name=$1, phone=$2, party_size=$3, reservation_date=$4, reservation_time=$5, special_request=$6
       WHERE id = $7 RETURNING *`,
            [name, phone, party_size, reservation_date, reservation_time, special_request, id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Reservation not found' });
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating reservation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteReservation = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM reservations WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Reservation not found' });
        res.json({ message: 'Reservation deleted' });
    } catch (error) {
        console.error('Error deleting reservation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};