#!/bin/bash
# Simple setup script to create database and run migration

DB_NAME="reservation_demo"

echo "Creating PostgreSQL database: $DB_NAME"
createdb $DB_NAME

echo "Running migration script..."
psql -d $DB_NAME -f db/migrate.sql

echo "✅ Database setup complete."