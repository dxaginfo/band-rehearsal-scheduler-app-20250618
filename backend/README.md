# Band Rehearsal Scheduler Backend

This is the backend API for the Band Rehearsal Scheduler application. It provides a RESTful API for the frontend to interact with.

## 🚀 Features

- RESTful API design
- JWT-based authentication
- Role-based access control
- PostgreSQL database with Drizzle ORM
- Email notifications
- Scheduled tasks

## 🛠️ Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Drizzle ORM
- Redis (for caching and rate limiting)
- Winston (for logging)

## 📋 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login a user
- `POST /api/v1/auth/refresh` - Refresh access token
- `GET /api/v1/auth/profile` - Get user profile
- `PUT /api/v1/auth/profile` - Update user profile
- `POST /api/v1/auth/forgot-password` - Request password reset
- `POST /api/v1/auth/reset-password` - Reset password

### Bands
- `GET /api/v1/bands` - Get all bands for a user
- `POST /api/v1/bands` - Create a new band
- `GET /api/v1/bands/:id` - Get a band by ID
- `PUT /api/v1/bands/:id` - Update a band
- `DELETE /api/v1/bands/:id` - Delete a band
- `GET /api/v1/bands/:id/members` - Get band members
- `POST /api/v1/bands/:id/members` - Add a member to a band
- `DELETE /api/v1/bands/:id/members/:userId` - Remove a member from a band

### Rehearsals
- `GET /api/v1/rehearsals/band/:bandId` - Get rehearsals for a band
- `GET /api/v1/rehearsals/user` - Get all rehearsals for a user
- `GET /api/v1/rehearsals/user/upcoming` - Get upcoming rehearsals for a user
- `GET /api/v1/rehearsals/:id` - Get a rehearsal by ID
- `POST /api/v1/rehearsals` - Create a new rehearsal
- `PUT /api/v1/rehearsals/:id` - Update a rehearsal
- `DELETE /api/v1/rehearsals/:id` - Delete a rehearsal
- `PUT /api/v1/rehearsals/:id/attendance` - Update attendance status
- `GET /api/v1/rehearsals/:id/attendees` - Get attendees for a rehearsal
- `POST /api/v1/rehearsals/:id/reminders` - Send rehearsal reminders

### Locations
- `GET /api/v1/locations` - Get all locations
- `POST /api/v1/locations` - Create a new location
- `GET /api/v1/locations/:id` - Get a location by ID
- `PUT /api/v1/locations/:id` - Update a location
- `DELETE /api/v1/locations/:id` - Delete a location

## 🛡️ Environment Variables

The backend requires the following environment variables:

```
# Server Configuration
PORT=4000
NODE_ENV=development
API_URL=http://localhost:4000/v1

# Database Configuration
DATABASE_URL=postgres://user:password@localhost:5432/band_rehearsal_scheduler

# Authentication
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=1h
REFRESH_TOKEN_EXPIRES_IN=7d

# Logging
LOG_LEVEL=debug

# Redis Configuration
REDIS_URL=redis://localhost:6379

# Email Configuration
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASSWORD=your-smtp-password
EMAIL_FROM=noreply@band-rehearsal-scheduler.com

# Web Push Configuration
VAPID_PUBLIC_KEY=your-vapid-public-key
VAPID_PRIVATE_KEY=your-vapid-private-key
VAPID_SUBJECT=mailto:admin@band-rehearsal-scheduler.com

# API Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

## 🔧 Setup and Installation

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn
- PostgreSQL (v14 or higher)
- Redis

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/dxaginfo/band-rehearsal-scheduler-app-20250618.git
   cd band-rehearsal-scheduler-app-20250618/backend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Run database migrations
   ```bash
   npm run migrate
   ```

5. Start the development server
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:4000/v1`.

## 📊 Database Schema

The database uses the following main tables:

- `users` - User accounts
- `bands` - Band information
- `band_members` - Members of a band with roles
- `rehearsals` - Scheduled rehearsal sessions
- `locations` - Rehearsal venues and locations
- `rehearsal_attendees` - Attendance tracking
- `notifications` - System notifications

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📖 API Documentation

API documentation is available at `/api/docs` when running the server, powered by Swagger.