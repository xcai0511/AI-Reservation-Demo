DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS slot_availability;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Reservations Table
CREATE TABLE IF NOT EXISTS reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    party_size INTEGER NOT NULL CHECK (party_size BETWEEN 2 AND 12),
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    special_request TEXT,
    created_at TIMESTAMP DEFAULT NOW()
    );

-- Slot Availability Table
CREATE TABLE IF NOT EXISTS slot_availability (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    seats_booked INTEGER NOT NULL DEFAULT 0,
    max_capacity INTEGER NOT NULL DEFAULT 40,
    is_blocked BOOLEAN NOT NULL DEFAULT false
    );