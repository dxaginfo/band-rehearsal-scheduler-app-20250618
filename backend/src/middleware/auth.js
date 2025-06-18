/**
 * Authentication middleware
 */

const jwt = require('jsonwebtoken');
const { logger } = require('../utils/logger');

// JWT secret key - should be set in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

/**
 * Middleware to authenticate JWT tokens
 * Adds user info to request object if token is valid
 */
const authenticate = (req, res, next) => {
  // Get token from Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: {
        code: 'MISSING_TOKEN',
        message: 'Authentication token is required',
      },
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Add user info to request object
    req.user = {
      id: decoded.userId,
      email: decoded.email,
    };
    
    return next();
  } catch (error) {
    logger.error('Error authenticating token:', error);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: {
          code: 'TOKEN_EXPIRED',
          message: 'Token has expired',
        },
      });
    }
    
    return res.status(401).json({
      error: {
        code: 'INVALID_TOKEN',
        message: 'Invalid authentication token',
      },
    });
  }
};

/**
 * Optional authentication middleware
 * Adds user info to request object if token is valid, but doesn't fail if token is missing
 */
const optionalAuth = (req, res, next) => {
  // Get token from Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next();
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Add user info to request object
    req.user = {
      id: decoded.userId,
      email: decoded.email,
    };
  } catch (error) {
    // Log error but don't fail the request
    logger.warn('Error in optional authentication:', error);
  }
  
  return next();
};

/**
 * Check if user has required role in a specific band
 * Requires authenticate middleware to be used first
 */
const requireBandRole = (requiredRoles) => {
  return async (req, res, next) => {
    try {
      const { bandId } = req.params;
      const userId = req.user.id;
      
      // Get user's role in band from database
      // This would typically query the band_members table
      // For simplicity, just checking if band ID and required roles exist
      if (!bandId) {
        return res.status(400).json({
          error: {
            code: 'MISSING_BAND_ID',
            message: 'Band ID is required',
          },
        });
      }
      
      // In a real implementation, query the database to check user's role
      // For now, we'll implement a placeholder
      const userRole = 'leader'; // This would come from database query
      
      // Check if user has required role
      if (Array.isArray(requiredRoles) && !requiredRoles.includes(userRole)) {
        return res.status(403).json({
          error: {
            code: 'INSUFFICIENT_PERMISSIONS',
            message: 'You do not have permission to perform this action',
          },
        });
      }
      
      // Add band role to request for use in controllers
      req.bandRole = userRole;
      
      return next();
    } catch (error) {
      logger.error('Error checking band role:', error);
      return next(error);
    }
  };
};

module.exports = {
  authenticate,
  optionalAuth,
  requireBandRole,
};