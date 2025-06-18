/**
 * Database connection and Drizzle ORM setup
 */

const { Pool } = require('pg');
const { drizzle } = require('drizzle-orm/node-postgres');
const { logger } = require('../utils/logger');

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 2000, // How long to wait for a connection
});

// Test the database connection
pool.on('connect', () => {
  logger.info('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  logger.error('PostgreSQL connection error:', err);
  process.exit(-1);
});

// Initialize Drizzle ORM with the connection pool
const db = drizzle(pool);

// Export the database connection and ORM instance
module.exports = {
  pool,
  db,
  
  // Helper function to close the database connection (useful for tests)
  async close() {
    await pool.end();
    logger.info('Database connection closed');
  },
  
  // Helper function to execute raw SQL queries
  async query(text, params) {
    const start = Date.now();
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    
    logger.debug(`Executed query: ${text}`);
    logger.debug(`Query parameters: ${params}`);
    logger.debug(`Query duration: ${duration}ms, rows: ${result.rowCount}`);
    
    return result;
  }
};