# Band Rehearsal Scheduler

A modern web application designed to help bands and musicians efficiently schedule rehearsals, track attendance, send reminders, and suggest optimal rehearsal times based on member availability.

## 🎵 Features

### Core Features
- **User Management**
  - Create accounts for band leaders and members
  - Profile management with instrument and availability preferences
  
- **Calendar and Scheduling**
  - Create rehearsal events with date, time, and location
  - Calendar view for all upcoming rehearsals
  
- **Availability Tracking**
  - Poll members for availability for specific time slots
  - Easy availability indication for proposed rehearsal times
  
- **Automated Reminders**
  - Automatic notifications to all members before rehearsals
  - Customizable notification preferences
  
- **Attendance Tracking**
  - Track attendance for each rehearsal
  - Allow members to confirm attendance or report absences
  
- **Rehearsal Notes and Setlists**
  - Attach setlists and notes to rehearsal events
  - Access to rehearsal materials before sessions
  
- **Smart Scheduling Suggestions**
  - Optimal rehearsal time suggestions based on members' historical availability
  - Consideration of regular availability patterns

### Enhanced Features
- **Rehearsal Space Integration**
- **In-app Communication Tools**
- **Progress Tracking for Songs**

## 🚀 Technology Stack

### Front-End
- Next.js (React-based)
- Tailwind CSS
- React Context API and Hooks
- React Big Calendar
- React Hook Form
- Shadcn UI

### Back-End
- Node.js
- Express.js
- Swagger/OpenAPI
- JWT Authentication
- Nodemailer
- Web Push API

### Database
- PostgreSQL
- Drizzle ORM
- Redis (for caching)

### Deployment
- Vercel (frontend)
- Railway or Fly.io (backend)
- GitHub Actions (CI/CD)
- Sentry (error tracking)

## 🏗️ Architecture

The application follows a microservices architecture with the following components:

1. **Client Application (Frontend)**
2. **API Gateway**
3. **Authentication Service**
4. **Scheduler Service**
5. **Notification Service**
6. **User Management Service**
7. **Analytics Service**
8. **Database Layer**

## 📊 Database Schema

The application uses a relational database with the following main tables:
- Users
- Bands
- Band Members
- Rehearsals
- Attendance
- Availability
- Setlists
- Songs
- Setlist Songs
- Notifications

See the `/docs` folder for detailed schema information.

## 🛠️ Setup and Installation

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn
- PostgreSQL (v14 or higher)
- Redis

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/dxaginfo/band-rehearsal-scheduler-app-20250618.git
   cd band-rehearsal-scheduler-app-20250618
   ```

2. Install dependencies
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Set up environment variables
   ```bash
   # Backend .env
   cp backend/.env.example backend/.env

   # Frontend .env
   cp frontend/.env.example frontend/.env
   ```

4. Run database migrations
   ```bash
   cd backend
   npm run migrate
   ```

5. Start the development servers
   ```bash
   # Start backend
   cd backend
   npm run dev

   # Start frontend
   cd frontend
   npm run dev
   ```

6. Access the application at `http://localhost:3000`

## 📦 Project Structure

```
.
├── backend/                  # Backend application
│   ├── src/
│   │   ├── api/              # API routes
│   │   ├── config/           # Configuration files
│   │   ├── controllers/      # Route controllers
│   │   ├── db/               # Database setup and migrations
│   │   ├── middleware/       # Express middleware
│   │   ├── models/           # Data models
│   │   ├── services/         # Business logic
│   │   ├── utils/            # Utility functions
│   │   └── index.ts          # Application entry point
│   ├── tests/                # Backend tests
│   └── package.json          # Backend dependencies
│
├── frontend/                 # Frontend application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── context/          # React context
│   │   ├── hooks/            # Custom hooks
│   │   ├── pages/            # Next.js pages
│   │   ├── styles/           # Tailwind and global styles
│   │   ├── types/            # TypeScript types
│   │   └── utils/            # Utility functions
│   ├── tests/                # Frontend tests
│   └── package.json          # Frontend dependencies
│
├── docs/                     # Documentation
│   ├── api/                  # API documentation
│   ├── database/             # Database schema
│   └── architecture/         # Architecture diagrams
│
├── scripts/                  # Utility scripts
├── .github/                  # GitHub Actions workflows
├── docker-compose.yml        # Docker configuration
├── .gitignore                # Git ignore file
└── README.md                 # Project README
```

## 📝 API Documentation

API documentation is available at `/api/docs` when running the backend server, powered by Swagger.

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test
```

## 🚢 Deployment

The application is designed to be deployed using modern cloud services:

1. **Frontend**: Deploy to Vercel
   ```bash
   cd frontend
   vercel --prod
   ```

2. **Backend**: Deploy to Railway or Fly.io
   ```bash
   cd backend
   flyctl deploy
   ```

## 🔒 Security Considerations

- JWT authentication with refresh tokens
- Password hashing with Argon2
- Protection against XSS, CSRF, and SQL Injection
- Rate limiting
- HTTPS enforcement
- Regular security audits

## 🚀 Scalability Considerations

- Connection pooling
- Caching strategies
- Horizontal scaling
- CDN for static assets
- Database indexing
- Load balancing

## 👥 Contributing

Contributions are welcome! Please read our [contributing guide](CONTRIBUTING.md) to get started.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For any questions or support, please contact the team at band-rehearsal-scheduler@example.com.