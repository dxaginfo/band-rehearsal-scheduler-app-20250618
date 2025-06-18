/**
 * Database migration script
 * Applies migrations to create and update database schema
 */

require('dotenv').config();
const path = require('path');
const { migrate } = require('drizzle-orm/node-postgres/migrator');
const { logger } = require('../utils/logger');
const { db, pool } = require('./index');

// Path to migration files
const MIGRATIONS_PATH = path.join(__dirname, 'migrations');

/**
 * Run database migrations
 */
const runMigrations = async () => {
  try {
    logger.info('Starting database migrations');
    logger.info(`Using migrations from: ${MIGRATIONS_PATH}`);
    
    // Run migrations
    await migrate(db, { migrationsFolder: MIGRATIONS_PATH });
    
    logger.info('Database migrations completed successfully');
    
    // Close database connection
    await pool.end();
    
    process.exit(0);
  } catch (error) {
    logger.error('Error running database migrations:', error);
    
    // Close database connection
    await pool.end();
    
    process.exit(1);
  }
};

// Run migrations if script is executed directly
if (require.main === module) {
  runMigrations();
}

module.exports = { runMigrations };