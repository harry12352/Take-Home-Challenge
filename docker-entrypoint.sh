#!/bin/bash
set -e

# Wait for MySQL to be ready
until mysql -h"$DATABASE_HOST" -u"$DATABASE_USERNAME" -p"$DATABASE_PASSWORD" -e 'SELECT 1'; do
  >&2 echo "MySQL is unavailable - sleeping"
  sleep 1
done

# Run migrations and seeders
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

# Start the application
exec "$@"
