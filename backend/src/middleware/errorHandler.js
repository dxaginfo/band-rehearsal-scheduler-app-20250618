/**
 * Global error handling middleware
 */

const { logger } = require('../utils/logger');

/**
 * Middleware to handle 404 Not Found errors
 */
const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: `Route not found: ${req.method} ${req.originalUrl}`,
    },
  });
};

/**
 * Middleware to handle all other errors
 */
const errorHandler = (err, req, res, next) => {
  // Log error with details
  logger.error('Error occurred:', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    body: req.body,
    params: req.params,
    query: req.query,
    ip: req.ip,
  });
  
  // Check if error is a known type we want to handle specifically
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: {
        code: 'INVALID_TOKEN',
        message: 'Invalid authentication token',
      },
    });
  }
  
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: {
        code: 'TOKEN_EXPIRED',
        message: 'Authentication token has expired',
      },
    });
  }
  
  if (err.code === '23505') { // PostgreSQL unique constraint violation
    return res.status(409).json({
      error: {
        code: 'DUPLICATE_ENTRY',
        message: 'A record with this information already exists',
      },
    });
  }
  
  // Default error response
  // In production, don't expose the error message and stack trace
  const response = {
    error: {
      code: 'SERVER_ERROR',
      message: process.env.NODE_ENV === 'production' 
        ? 'An unexpected error occurred' 
        : err.message || 'An unexpected error occurred',
    },
  };
  
  // Include stack trace in development
  if (process.env.NODE_ENV !== 'production') {
    response.error.stack = err.stack;
  }
  
  // Send response
  return res.status(500).json(response);
};

module.exports = {
  notFoundHandler,
  errorHandler,
};