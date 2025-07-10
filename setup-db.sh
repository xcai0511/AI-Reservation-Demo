#!/bin/bash

DB_NAME="reservation_demo"
MIGRATION_PATH="server/db/migrate.sql"

echo "Creating PostgreSQL database: $DB_NAME"
createdb $DB_NAME 2>/dev/null || echo "Database $DB_NAME already exists."

echo "Running migration script..."
if [ -f "$MIGRATION_PATH" ]; then
  psql -d $DB_NAME -f $MIGRATION_PATH
  echo "✅ Database setup complete."
else
  echo "❌ Migration script not found at $MIGRATION_PATH"
fi