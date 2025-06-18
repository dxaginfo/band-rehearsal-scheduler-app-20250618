# API Documentation

This document provides an overview of the API endpoints available in the Band Rehearsal Scheduler application.

## Base URL

```
https://api.band-rehearsal-scheduler.com/v1
```

For local development:

```
http://localhost:4000/v1
```

## Authentication

Most API endpoints require authentication. Include a bearer token in the `Authorization` header:

```
Authorization: Bearer {token}
```

Tokens are obtained via the `/auth/login` endpoint.

## Error Handling

All API endpoints return standard HTTP status codes:

- `200 OK`: Request was successful
- `201 Created`: Resource was successfully created
- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Authentication required or failed
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `409 Conflict`: Resource conflict (e.g., duplicate entry)
- `422 Unprocessable Entity`: Validation error
- `500 Internal Server Error`: Server error

Error responses have the following format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {}  // Optional additional details
  }
}
```

## Endpoints

### Authentication

#### Register a new user

```
POST /auth/register
```

Request body:
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "firstName": "John",
  "lastName": "Doe",
  "instrument": "Guitar"  // Optional
}
```

Response:
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "instrument": "Guitar",
  "createdAt": "2025-06-18T12:00:00Z"
}
```

#### User login

```
POST /auth/login
```

Request body:
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

Response:
```json
{
  "token": "jwt-token",
  "refreshToken": "refresh-token",
  "expiresIn": 3600,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

#### Refresh access token

```
POST /auth/refresh
```

Request body:
```json
{
  "refreshToken": "refresh-token"
}
```

Response:
```json
{
  "token": "new-jwt-token",
  "refreshToken": "new-refresh-token",
  "expiresIn": 3600
}
```

#### Request password reset

```
POST /auth/forgot-password
```

Request body:
```json
{
  "email": "user@example.com"
}
```

Response:
```json
{
  "message": "Password reset email sent"
}
```

#### Reset password with token

```
POST /auth/reset-password
```

Request body:
```json
{
  "token": "reset-token",
  "password": "new-password"
}
```

Response:
```json
{
  "message": "Password reset successful"
}
```

### Users

#### Get current user profile

```
GET /users/me
```

Response:
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "instrument": "Guitar",
  "profileImageUrl": "https://example.com/image.jpg",
  "createdAt": "2025-06-18T12:00:00Z"
}
```

#### Update user profile

```
PUT /users/me
```

Request body:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "instrument": "Bass Guitar",
  "profileImageUrl": "https://example.com/new-image.jpg"
}
```

Response:
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "instrument": "Bass Guitar",
  "profileImageUrl": "https://example.com/new-image.jpg",
  "updatedAt": "2025-06-18T12:30:00Z"
}
```

#### Get user availability

```
GET /users/availability
```

Response:
```json
{
  "availability": [
    {
      "id": "uuid",
      "dayOfWeek": 1,  // Monday
      "startTime": "18:00:00",
      "endTime": "22:00:00",
      "isRecurring": true
    },
    {
      "id": "uuid",
      "dayOfWeek": 3,  // Wednesday
      "startTime": "19:00:00",
      "endTime": "21:00:00",
      "isRecurring": true
    }
  ]
}
```

#### Update user availability

```
PUT /users/availability
```

Request body:
```json
{
  "availability": [
    {
      "dayOfWeek": 1,  // Monday
      "startTime": "18:00:00",
      "endTime": "22:00:00",
      "isRecurring": true
    },
    {
      "dayOfWeek": 3,  // Wednesday
      "startTime": "19:00:00",
      "endTime": "21:00:00",
      "isRecurring": true
    }
  ]
}
```

Response:
```json
{
  "message": "Availability updated successfully",
  "availability": [
    {
      "id": "uuid",
      "dayOfWeek": 1,
      "startTime": "18:00:00",
      "endTime": "22:00:00",
      "isRecurring": true
    },
    {
      "id": "uuid",
      "dayOfWeek": 3,
      "startTime": "19:00:00",
      "endTime": "21:00:00",
      "isRecurring": true
    }
  ]
}
```

### Bands

#### Create a new band

```
POST /bands
```

Request body:
```json
{
  "name": "The Rockers",
  "description": "Rock and blues band",
  "logoUrl": "https://example.com/logo.jpg"
}
```

Response:
```json
{
  "id": "uuid",
  "name": "The Rockers",
  "description": "Rock and blues band",
  "logoUrl": "https://example.com/logo.jpg",
  "createdBy": "user-uuid",
  "createdAt": "2025-06-18T12:00:00Z"
}
```

#### List user's bands

```
GET /bands
```

Response:
```json
{
  "bands": [
    {
      "id": "uuid",
      "name": "The Rockers",
      "description": "Rock and blues band",
      "logoUrl": "https://example.com/logo.jpg",
      "role": "leader",
      "memberCount": 5
    },
    {
      "id": "uuid",
      "name": "Jazz Ensemble",
      "description": "Jazz standards and originals",
      "logoUrl": "https://example.com/jazz-logo.jpg",
      "role": "member",
      "memberCount": 8
    }
  ]
}
```

#### Get band details

```
GET /bands/:id
```

Response:
```json
{
  "id": "uuid",
  "name": "The Rockers",
  "description": "Rock and blues band",
  "logoUrl": "https://example.com/logo.jpg",
  "createdBy": "user-uuid",
  "createdAt": "2025-06-18T12:00:00Z",
  "members": [
    {
      "id": "user-uuid",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "instrument": "Guitar",
      "role": "leader",
      "joinedAt": "2025-06-18T12:00:00Z"
    },
    {
      "id": "user-uuid",
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "jane@example.com",
      "instrument": "Drums",
      "role": "member",
      "joinedAt": "2025-06-18T12:30:00Z"
    }
  ]
}
```

#### Update band details

```
PUT /bands/:id
```

Request body:
```json
{
  "name": "The Rock Stars",
  "description": "Rock, blues, and jazz fusion",
  "logoUrl": "https://example.com/new-logo.jpg"
}
```

Response:
```json
{
  "id": "uuid",
  "name": "The Rock Stars",
  "description": "Rock, blues, and jazz fusion",
  "logoUrl": "https://example.com/new-logo.jpg",
  "updatedAt": "2025-06-18T13:00:00Z"
}
```

#### Delete band

```
DELETE /bands/:id
```

Response:
```json
{
  "message": "Band deleted successfully"
}
```

#### Add member to band

```
POST /bands/:id/members
```

Request body:
```json
{
  "email": "newmember@example.com",
  "role": "member"
}
```

Response:
```json
{
  "id": "user-uuid",
  "firstName": "New",
  "lastName": "Member",
  "email": "newmember@example.com",
  "role": "member",
  "joinedAt": "2025-06-18T14:00:00Z"
}
```

#### Remove member from band

```
DELETE /bands/:id/members/:userId
```

Response:
```json
{
  "message": "Member removed from band"
}
```

#### Update member role

```
PUT /bands/:id/members/:userId/role
```

Request body:
```json
{
  "role": "admin"
}
```

Response:
```json
{
  "id": "user-uuid",
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "role": "admin",
  "updatedAt": "2025-06-18T14:30:00Z"
}
```

### Rehearsals

#### Create a new rehearsal

```
POST /bands/:id/rehearsals
```

Request body:
```json
{
  "title": "Weekly Practice",
  "description": "Focus on new songs",
  "location": "Studio A",
  "startTime": "2025-06-20T18:00:00Z",
  "endTime": "2025-06-20T21:00:00Z",
  "isRecurring": true,
  "recurrencePattern": "weekly"
}
```

Response:
```json
{
  "id": "uuid",
  "title": "Weekly Practice",
  "description": "Focus on new songs",
  "location": "Studio A",
  "startTime": "2025-06-20T18:00:00Z",
  "endTime": "2025-06-20T21:00:00Z",
  "isRecurring": true,
  "recurrencePattern": "weekly",
  "bandId": "band-uuid",
  "createdBy": "user-uuid",
  "createdAt": "2025-06-18T15:00:00Z"
}
```

#### List band rehearsals

```
GET /bands/:id/rehearsals
```

Query parameters:
- `startDate`: Filter by start date (ISO format)
- `endDate`: Filter by end date (ISO format)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

Response:
```json
{
  "rehearsals": [
    {
      "id": "uuid",
      "title": "Weekly Practice",
      "location": "Studio A",
      "startTime": "2025-06-20T18:00:00Z",
      "endTime": "2025-06-20T21:00:00Z",
      "isRecurring": true,
      "confirmedCount": 5,
      "tentativeCount": 2,
      "declinedCount": 1
    },
    {
      "id": "uuid",
      "title": "Pre-show Rehearsal",
      "location": "Studio B",
      "startTime": "2025-06-25T17:00:00Z",
      "endTime": "2025-06-25T22:00:00Z",
      "isRecurring": false,
      "confirmedCount": 8,
      "tentativeCount": 0,
      "declinedCount": 0
    }
  ],
  "pagination": {
    "total": 15,
    "page": 1,
    "limit": 10,
    "pages": 2
  }
}
```

#### Get rehearsal details

```
GET /rehearsals/:id
```

Response:
```json
{
  "id": "uuid",
  "title": "Weekly Practice",
  "description": "Focus on new songs",
  "location": "Studio A",
  "startTime": "2025-06-20T18:00:00Z",
  "endTime": "2025-06-20T21:00:00Z",
  "isRecurring": true,
  "recurrencePattern": "weekly",
  "bandId": "band-uuid",
  "bandName": "The Rockers",
  "createdBy": "user-uuid",
  "createdAt": "2025-06-18T15:00:00Z",
  "attendance": [
    {
      "userId": "user-uuid",
      "firstName": "John",
      "lastName": "Doe",
      "status": "confirmed",
      "respondedAt": "2025-06-18T16:00:00Z"
    },
    {
      "userId": "user-uuid",
      "firstName": "Jane",
      "lastName": "Smith",
      "status": "tentative",
      "notes": "Might be late",
      "respondedAt": "2025-06-18T16:30:00Z"
    }
  ],
  "setlists": [
    {
      "id": "uuid",
      "name": "Main setlist",
      "createdBy": "user-uuid",
      "createdAt": "2025-06-18T17:00:00Z"
    }
  ]
}
```

#### Update rehearsal details

```
PUT /rehearsals/:id
```

Request body:
```json
{
  "title": "Updated Practice",
  "description": "Focus on upcoming show",
  "location": "Studio C",
  "startTime": "2025-06-20T19:00:00Z",
  "endTime": "2025-06-20T22:00:00Z"
}
```

Response:
```json
{
  "id": "uuid",
  "title": "Updated Practice",
  "description": "Focus on upcoming show",
  "location": "Studio C",
  "startTime": "2025-06-20T19:00:00Z",
  "endTime": "2025-06-20T22:00:00Z",
  "isRecurring": true,
  "recurrencePattern": "weekly",
  "updatedAt": "2025-06-18T18:00:00Z"
}
```

#### Cancel rehearsal

```
DELETE /rehearsals/:id
```

Response:
```json
{
  "message": "Rehearsal cancelled successfully"
}
```

#### Update attendance status

```
POST /rehearsals/:id/attendance
```

Request body:
```json
{
  "status": "confirmed",  // confirmed, declined, tentative
  "notes": "Will be there on time"
}
```

Response:
```json
{
  "userId": "user-uuid",
  "rehearsalId": "rehearsal-uuid",
  "status": "confirmed",
  "notes": "Will be there on time",
  "respondedAt": "2025-06-18T19:00:00Z"
}
```

#### Get attendance for rehearsal

```
GET /rehearsals/:id/attendance
```

Response:
```json
{
  "attendance": [
    {
      "userId": "user-uuid",
      "firstName": "John",
      "lastName": "Doe",
      "instrument": "Guitar",
      "status": "confirmed",
      "notes": "Will be there on time",
      "respondedAt": "2025-06-18T19:00:00Z"
    },
    {
      "userId": "user-uuid",
      "firstName": "Jane",
      "lastName": "Smith",
      "instrument": "Drums",
      "status": "tentative",
      "notes": "Might be late",
      "respondedAt": "2025-06-18T16:30:00Z"
    }
  ]
}
```

#### Get suggested optimal rehearsal times

```
POST /bands/:id/optimal-times
```

Request body:
```json
{
  "duration": 180,  // Duration in minutes
  "startDate": "2025-06-20",
  "endDate": "2025-06-27",
  "minAttendance": 5  // Minimum number of attendees
}
```

Response:
```json
{
  "optimalTimes": [
    {
      "startTime": "2025-06-21T18:00:00Z",
      "endTime": "2025-06-21T21:00:00Z",
      "estimatedAttendance": 8,
      "availableMembers": [
        {
          "userId": "user-uuid",
          "firstName": "John",
          "lastName": "Doe"
        },
        {
          "userId": "user-uuid",
          "firstName": "Jane",
          "lastName": "Smith"
        }
        // Additional members...
      ]
    },
    {
      "startTime": "2025-06-23T19:00:00Z",
      "endTime": "2025-06-23T22:00:00Z",
      "estimatedAttendance": 7,
      "availableMembers": [
        // Members available at this time
      ]
    }
  ]
}
```

### Setlists and Songs

#### Create setlist for rehearsal

```
POST /rehearsals/:id/setlists
```

Request body:
```json
{
  "name": "Show Preparation",
  "notes": "Songs for upcoming gig"
}
```

Response:
```json
{
  "id": "uuid",
  "name": "Show Preparation",
  "notes": "Songs for upcoming gig",
  "rehearsalId": "rehearsal-uuid",
  "createdBy": "user-uuid",
  "createdAt": "2025-06-18T20:00:00Z"
}
```

#### Get setlists for rehearsal

```
GET /rehearsals/:id/setlists
```

Response:
```json
{
  "setlists": [
    {
      "id": "uuid",
      "name": "Show Preparation",
      "notes": "Songs for upcoming gig",
      "createdBy": "user-uuid",
      "createdAt": "2025-06-18T20:00:00Z",
      "songCount": 12
    }
  ]
}
```

#### Update setlist

```
PUT /setlists/:id
```

Request body:
```json
{
  "name": "Final Show Preparation",
  "notes": "Final song selection for the gig"
}
```

Response:
```json
{
  "id": "uuid",
  "name": "Final Show Preparation",
  "notes": "Final song selection for the gig",
  "updatedAt": "2025-06-18T21:00:00Z"
}
```

#### Delete setlist

```
DELETE /setlists/:id
```

Response:
```json
{
  "message": "Setlist deleted successfully"
}
```

#### Add song to band repertoire

```
POST /bands/:id/songs
```

Request body:
```json
{
  "title": "Highway to Hell",
  "artist": "AC/DC",
  "duration": 210,  // in seconds
  "notes": "Key of A"
}
```

Response:
```json
{
  "id": "uuid",
  "title": "Highway to Hell",
  "artist": "AC/DC",
  "duration": 210,
  "notes": "Key of A",
  "bandId": "band-uuid",
  "createdAt": "2025-06-18T22:00:00Z"
}
```

#### List band's songs

```
GET /bands/:id/songs
```

Response:
```json
{
  "songs": [
    {
      "id": "uuid",
      "title": "Highway to Hell",
      "artist": "AC/DC",
      "duration": 210,
      "notes": "Key of A"
    },
    {
      "id": "uuid",
      "title": "Sweet Child O' Mine",
      "artist": "Guns N' Roses",
      "duration": 355,
      "notes": "Key of D"
    }
  ]
}
```

#### Add song to setlist

```
POST /setlists/:id/songs
```

Request body:
```json
{
  "songId": "song-uuid",
  "position": 1,
  "notes": "Extended solo section"
}
```

Response:
```json
{
  "id": "uuid",
  "setlistId": "setlist-uuid",
  "songId": "song-uuid",
  "title": "Highway to Hell",
  "artist": "AC/DC",
  "position": 1,
  "notes": "Extended solo section"
}
```

#### Reorder songs in setlist

```
PUT /setlists/:id/songs/:songId/position
```

Request body:
```json
{
  "position": 3
}
```

Response:
```json
{
  "message": "Song position updated successfully"
}
```

#### Remove song from setlist

```
DELETE /setlists/:id/songs/:songId
```

Response:
```json
{
  "message": "Song removed from setlist"
}
```

### Notifications

#### Get user notifications

```
GET /notifications
```

Query parameters:
- `read`: Filter by read status (true/false)
- `page`: Page number
- `limit`: Items per page

Response:
```json
{
  "notifications": [
    {
      "id": "uuid",
      "type": "reminder",
      "message": "Rehearsal tomorrow at 6 PM",
      "isRead": false,
      "rehearsalId": "rehearsal-uuid",
      "rehearsalTitle": "Weekly Practice",
      "createdAt": "2025-06-18T23:00:00Z"
    },
    {
      "id": "uuid",
      "type": "change",
      "message": "Rehearsal time changed to 7 PM",
      "isRead": true,
      "rehearsalId": "rehearsal-uuid",
      "rehearsalTitle": "Pre-show Rehearsal",
      "createdAt": "2025-06-17T20:00:00Z"
    }
  ],
  "pagination": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "pages": 3
  }
}
```

#### Mark notification as read

```
PUT /notifications/:id/read
```

Response:
```json
{
  "id": "uuid",
  "isRead": true,
  "updatedAt": "2025-06-19T00:00:00Z"
}
```

#### Update notification preferences

```
PUT /notifications/settings
```

Request body:
```json
{
  "emailNotifications": true,
  "pushNotifications": true,
  "reminderHours": 24,  // Send reminders 24 hours before
  "rehearsalChanges": true,
  "newSetlists": true
}
```

Response:
```json
{
  "message": "Notification preferences updated successfully",
  "settings": {
    "emailNotifications": true,
    "pushNotifications": true,
    "reminderHours": 24,
    "rehearsalChanges": true,
    "newSetlists": true,
    "updatedAt": "2025-06-19T01:00:00Z"
  }
}
```

## Webhook Events

The API supports webhooks for real-time integration. Register webhooks at `/webhooks/register`.

Available events:
- `rehearsal.created`
- `rehearsal.updated`
- `rehearsal.cancelled`
- `attendance.updated`
- `member.added`
- `member.removed`
- `setlist.updated`

## Rate Limiting

API requests are rate-limited to:
- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated requests

Rate limit headers are included in API responses:
- `X-RateLimit-Limit`: Total number of requests allowed
- `X-RateLimit-Remaining`: Number of requests remaining
- `X-RateLimit-Reset`: Time when rate limit resets (Unix timestamp)