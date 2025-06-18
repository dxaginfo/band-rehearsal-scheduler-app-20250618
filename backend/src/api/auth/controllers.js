/**
 * Authentication controllers
 */

const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { db } = require('../../db');
const { users } = require('../../db/schema');
const { eq } = require('drizzle-orm');
const { logger } = require('../../utils/logger');

// JWT secret key - should be set in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '1h';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

/**
 * Register a new user
 */
const register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, instrument } = req.body;

    // Check if user already exists
    const existingUser = await db.select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return res.status(409).json({
        error: {
          code: 'USER_EXISTS',
          message: 'A user with this email already exists',
        },
      });
    }

    // Hash password
    const passwordHash = await argon2.hash(password);

    // Create new user
    const newUser = await db.insert(users)
      .values({
        email,
        passwordHash,
        firstName,
        lastName,
        instrument,
      })
      .returning({
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        instrument: users.instrument,
        createdAt: users.createdAt,
      });

    // Return the created user
    return res.status(201).json(newUser[0]);
  } catch (error) {
    logger.error('Error in user registration:', error);
    return next(error);
  }
};

/**
 * Login user and return JWT token
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await db.select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (user.length === 0) {
      return res.status(401).json({
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password',
        },
      });
    }

    // Verify password
    const isPasswordValid = await argon2.verify(user[0].passwordHash, password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password',
        },
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user[0].id,
        email: user[0].email,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { 
        userId: user[0].id,
        tokenId: uuidv4(),
      },
      JWT_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
    );

    // In a production environment, store refresh token in database
    // with userId, tokenId, and expiration date

    // Return token and user info
    return res.status(200).json({
      token,
      refreshToken,
      expiresIn: 3600, // 1 hour in seconds
      user: {
        id: user[0].id,
        email: user[0].email,
        firstName: user[0].firstName,
        lastName: user[0].lastName,
      },
    });
  } catch (error) {
    logger.error('Error in user login:', error);
    return next(error);
  }
};

/**
 * Refresh access token using refresh token
 */
const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        error: {
          code: 'MISSING_TOKEN',
          message: 'Refresh token is required',
        },
      });
    }

    // Verify refresh token
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, JWT_SECRET);
    } catch (error) {
      return res.status(401).json({
        error: {
          code: 'INVALID_TOKEN',
          message: 'Invalid or expired refresh token',
        },
      });
    }

    // In a production environment, verify the refresh token
    // exists in the database and hasn't been revoked

    // Find user
    const user = await db.select()
      .from(users)
      .where(eq(users.id, decoded.userId))
      .limit(1);

    if (user.length === 0) {
      return res.status(401).json({
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found',
        },
      });
    }

    // Generate new JWT token
    const token = jwt.sign(
      { 
        userId: user[0].id,
        email: user[0].email,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Generate new refresh token
    const newRefreshToken = jwt.sign(
      { 
        userId: user[0].id,
        tokenId: uuidv4(),
      },
      JWT_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
    );

    // In a production environment, update refresh token in database

    // Return new tokens
    return res.status(200).json({
      token,
      refreshToken: newRefreshToken,
      expiresIn: 3600, // 1 hour in seconds
    });
  } catch (error) {
    logger.error('Error in token refresh:', error);
    return next(error);
  }
};

/**
 * Request password reset
 */
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await db.select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (user.length === 0) {
      // For security reasons, don't reveal if email exists or not
      return res.status(200).json({
        message: 'If your email is registered, you will receive a password reset link',
      });
    }

    // Generate reset token
    const resetToken = jwt.sign(
      { 
        userId: user[0].id,
        tokenId: uuidv4(),
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // In a production environment:
    // 1. Store reset token in database with expiration
    // 2. Send email with reset link using nodemailer

    // For now, just return success message
    return res.status(200).json({
      message: 'Password reset email sent',
      // In development environment only, include token for testing
      ...(process.env.NODE_ENV === 'development' ? { resetToken } : {}),
    });
  } catch (error) {
    logger.error('Error in forgot password:', error);
    return next(error);
  }
};

/**
 * Reset password with token
 */
const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        error: {
          code: 'MISSING_FIELDS',
          message: 'Token and password are required',
        },
      });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return res.status(401).json({
        error: {
          code: 'INVALID_TOKEN',
          message: 'Invalid or expired token',
        },
      });
    }

    // Hash new password
    const passwordHash = await argon2.hash(password);

    // Update user password
    await db.update(users)
      .set({ 
        passwordHash,
        updatedAt: new Date(),
      })
      .where(eq(users.id, decoded.userId));

    // In a production environment, invalidate the reset token in the database

    return res.status(200).json({
      message: 'Password reset successful',
    });
  } catch (error) {
    logger.error('Error in reset password:', error);
    return next(error);
  }
};

module.exports = {
  register,
  login,
  refreshToken,
  forgotPassword,
  resetPassword,
};