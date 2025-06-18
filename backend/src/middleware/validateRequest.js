/**
 * Request validation middleware using express-validator
 */

const { validationResult } = require('express-validator');

/**
 * Middleware to validate request based on previous express-validator checks
 * Responds with 400 and validation errors if validation fails
 */
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: errors.array().map(error => ({
          field: error.param,
          message: error.msg,
          value: error.value,
        })),
      },
    });
  }
  
  return next();
};

module.exports = {
  validateRequest,
};