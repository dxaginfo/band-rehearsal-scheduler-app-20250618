# Database Schema Design

## Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  instrument VARCHAR(100),
  profile_image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Bands Table
```sql
CREATE TABLE bands (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  logo_url VARCHAR(255),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Band Members Table
```sql
CREATE TABLE band_members (
  id UUID PRIMARY KEY,
  band_id UUID REFERENCES bands(id),
  user_id UUID REFERENCES users(id),
  role VARCHAR(50) NOT NULL, -- 'leader', 'member', 'admin'
  joined_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(band_id, user_id)
);
```

## Rehearsals Table
```sql
CREATE TABLE rehearsals (
  id UUID PRIMARY KEY,
  band_id UUID REFERENCES bands(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  is_recurring BOOLEAN DEFAULT FALSE,
  recurrence_pattern VARCHAR(50), -- 'weekly', 'biweekly', etc.
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Attendance Table
```sql
CREATE TABLE attendance (
  id UUID PRIMARY KEY,
  rehearsal_id UUID REFERENCES rehearsals(id),
  user_id UUID REFERENCES users(id),
  status VARCHAR(50) NOT NULL, -- 'confirmed', 'declined', 'tentative', 'no_response'
  notes TEXT,
  responded_at TIMESTAMP,
  UNIQUE(rehearsal_id, user_id)
);
```

## Availability Table
```sql
CREATE TABLE availability (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  day_of_week INTEGER NOT NULL, -- 0-6 for Sunday-Saturday
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_recurring BOOLEAN DEFAULT TRUE,
  UNIQUE(user_id, day_of_week, start_time, end_time)
);
```

## Setlists Table
```sql
CREATE TABLE setlists (
  id UUID PRIMARY KEY,
  rehearsal_id UUID REFERENCES rehearsals(id),
  name VARCHAR(255) NOT NULL,
  notes TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Songs Table
```sql
CREATE TABLE songs (
  id UUID PRIMARY KEY,
  band_id UUID REFERENCES bands(id),
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255),
  duration INTEGER, -- in seconds
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Setlist Songs Table
```sql
CREATE TABLE setlist_songs (
  id UUID PRIMARY KEY,
  setlist_id UUID REFERENCES setlists(id),
  song_id UUID REFERENCES songs(id),
  position INTEGER NOT NULL,
  notes TEXT,
  UNIQUE(setlist_id, position)
);
```

## Notifications Table
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  rehearsal_id UUID REFERENCES rehearsals(id),
  type VARCHAR(50) NOT NULL, -- 'reminder', 'change', 'cancellation'
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Indexes

```sql
-- Performance indexes
CREATE INDEX idx_band_members_band_id ON band_members(band_id);
CREATE INDEX idx_band_members_user_id ON band_members(user_id);
CREATE INDEX idx_rehearsals_band_id ON rehearsals(band_id);
CREATE INDEX idx_rehearsals_start_time ON rehearsals(start_time);
CREATE INDEX idx_attendance_rehearsal_id ON attendance(rehearsal_id);
CREATE INDEX idx_attendance_user_id ON attendance(user_id);
CREATE INDEX idx_availability_user_id ON availability(user_id);
CREATE INDEX idx_setlists_rehearsal_id ON setlists(rehearsal_id);
CREATE INDEX idx_songs_band_id ON songs(band_id);
CREATE INDEX idx_setlist_songs_setlist_id ON setlist_songs(setlist_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_rehearsal_id ON notifications(rehearsal_id);
```

## Entity Relationship Diagram

```
+-------+      +---------------+      +-------+
| Users |<-----| Band Members |----->| Bands |
+-------+      +---------------+      +-------+
    |                                     |
    |                                     |
    v                                     v
+---------------+                     +----------+
| Availability  |                     | Songs    |
+---------------+                     +----------+
                                          |
+---------------+      +----------+      |
| Attendance    |<-----| Rehearsals |<---+
+---------------+      +----------+      |
                           |             |
                           v             v
                      +----------+    +---------------+
                      | Setlists |<---| Setlist Songs |
                      +----------+    +---------------+
                           |
                           v
                   +---------------+
                   | Notifications |
                   +---------------+
```

This schema represents a normalized relational database design for the Rehearsal Scheduler application, with appropriate relationships between entities and necessary indexes for query optimization.