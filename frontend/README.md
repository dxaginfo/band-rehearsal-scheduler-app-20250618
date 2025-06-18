# Band Rehearsal Scheduler Frontend

This is the frontend application for the Band Rehearsal Scheduler, built with Next.js and Tailwind CSS.

## 🚀 Features

- Modern, responsive UI
- Authentication and user management
- Band creation and management
- Rehearsal scheduling and calendar views
- Attendance tracking
- Availability polling
- Email and in-app notifications
- Dark mode support
- Progressive Web App (PWA) capabilities

## 🛠️ Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Zustand for state management
- React Query for data fetching
- Shadcn UI components
- Jest and React Testing Library

## 📋 Project Structure

```
frontend/
├── public/            # Static assets
│   ├── fonts/         # Custom fonts
│   ├── images/        # Images and icons
│   └── manifest.json  # PWA manifest
├── src/
│   ├── app/           # Next.js App Router pages
│   │   ├── (auth)/    # Authentication routes
│   │   ├── (dashboard)/ # Protected dashboard routes
│   │   ├── api/       # API routes
│   │   └── layout.tsx # Root layout
│   ├── components/    # Reusable components
│   │   ├── auth/      # Authentication components
│   │   ├── bands/     # Band-related components
│   │   ├── dashboard/ # Dashboard components
│   │   ├── layout/    # Layout components
│   │   ├── rehearsals/ # Rehearsal components
│   │   ├── ui/        # UI components
│   │   └── theme-provider.tsx # Theme provider
│   ├── api/           # API service functions
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility libraries
│   ├── store/         # Global state management
│   ├── styles/        # Global styles
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Utility functions
├── .env.example       # Example environment variables
├── next.config.js     # Next.js configuration
├── package.json       # Dependencies and scripts
├── tailwind.config.js # Tailwind CSS configuration
└── tsconfig.json      # TypeScript configuration
```

## 🔧 Setup and Installation

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/dxaginfo/band-rehearsal-scheduler-app-20250618.git
   cd band-rehearsal-scheduler-app-20250618/frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`.

## 🎨 Key Components

### Authentication
- Login/Register forms
- Password reset flow
- Protected routes

### Band Management
- Create and edit bands
- Manage band members
- Band settings

### Rehearsal Scheduling
- Calendar view
- Create and edit rehearsals
- Suggest optimal rehearsal times

### Attendance Tracking
- Mark attendance
- View attendance history
- Attendance statistics

### User Profile
- Edit profile
- Manage availability preferences
- Notification settings

## 🌓 Theming

The application supports light and dark mode, using Tailwind CSS for styling. The theme can be toggled by the user and will respect system preferences.

## 📱 Progressive Web App (PWA)

The application is configured as a Progressive Web App, allowing:
- Installation on mobile devices
- Offline capabilities
- Push notifications for rehearsal reminders

## 🔒 Authentication and Security

- JWT-based authentication
- Secure token storage
- CSRF protection
- XSS prevention

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 📦 Building for Production

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## 🚀 Deployment

The frontend can be easily deployed to Vercel:

```bash
# Deploy to Vercel
vercel --prod
```

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Zustand Documentation](https://github.com/pmndrs/zustand)