/**
 * Band Rehearsal Scheduler API Server
 * Main entry point for the application
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const { logger } = require('./utils/logger');
const { errorHandler } = require('./middleware/errorHandler');
const { notFoundHandler } = require('./middleware/notFoundHandler');
const { authRoutes } = require('./api/auth/routes');
const { userRoutes } = require('./api/users/routes');
const { bandRoutes } = require('./api/bands/routes');
const { rehearsalRoutes } = require('./api/rehearsals/routes');
const { setlistRoutes } = require('./api/setlists/routes');
const { notificationRoutes } = require('./api/notifications/routes');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 4000;

// Swagger documentation setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Band Rehearsal Scheduler API',
      version: '1.0.0',
      description: 'API for scheduling band rehearsals, tracking attendance, and more',
      contact: {
        name: 'API Support',
        email: 'band-rehearsal-scheduler@example.com',
      },
    },
    servers: [
      {
        url: process.env.API_URL || `http://localhost:${PORT}/v1`,
        description: 'Development Server',
      },
    ],
  },
  apis: ['./src/api/**/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } })); // Logging

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use(limiter);

// API Routes
app.use('/v1/auth', authRoutes);
app.use('/v1/users', userRoutes);
app.use('/v1/bands', bandRoutes);
app.use('/v1/rehearsals', rehearsalRoutes);
app.use('/v1/setlists', setlistRoutes);
app.use('/v1/notifications', notificationRoutes);

// Swagger documentation route
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', version: '1.0.0' });
});

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Start the server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
    logger.info(`API Documentation available at http://localhost:${PORT}/api/docs`);
  });
}

// Export for testing
module.exports = { app };