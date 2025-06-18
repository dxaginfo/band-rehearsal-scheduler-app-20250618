/**
 * Authentication routes
 */

const express = require('express');
const { body } = require('express-validator');
const { validateRequest } = require('../../middleware/validateRequest');
const authController = require('./controllers');

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - firstName
 *               - lastName
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 8
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               instrument:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 *       409:
 *         description: User already exists
 */
router.post(
  '/register',
  [
    body('email')
      .isEmail().withMessage('Invalid email format')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
      .matches(/\d/).withMessage('Password must contain at least one number')
      .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
      .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter'),
    body('firstName')
      .trim()
      .notEmpty().withMessage('First name is required'),
    body('lastName')
      .trim()
      .notEmpty().withMessage('Last name is required'),
    body('instrument')
      .optional()
      .trim(),
    validateRequest,
  ],
  authController.register
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post(
  '/login',
  [
    body('email')
      .isEmail().withMessage('Invalid email format')
      .normalizeEmail(),
    body('password')
      .notEmpty().withMessage('Password is required'),
    validateRequest,
  ],
  authController.login
);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       400:
 *         description: Missing token
 *       401:
 *         description: Invalid or expired token
 */
router.post(
  '/refresh',
  [
    body('refreshToken')
      .notEmpty().withMessage('Refresh token is required'),
    validateRequest,
  ],
  authController.refreshToken
);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Request password reset
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Password reset email sent if email exists
 */
router.post(
  '/forgot-password',
  [
    body('email')
      .isEmail().withMessage('Invalid email format')
      .normalizeEmail(),
    validateRequest,
  ],
  authController.forgotPassword
);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset password with token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - password
 *             properties:
 *               token:
 *                 type: string
 *               password:
 *                 type: string
 *                 minLength: 8
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Invalid or expired token
 */
router.post(
  '/reset-password',
  [
    body('token')
      .notEmpty().withMessage('Token is required'),
    body('password')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
      .matches(/\d/).withMessage('Password must contain at least one number')
      .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
      .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter'),
    validateRequest,
  ],
  authController.resetPassword
);

module.exports = {
  authRoutes: router,
};