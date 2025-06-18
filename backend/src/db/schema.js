/**
 * Database schema definitions using Drizzle ORM
 */

const { 
  pgTable, 
  uuid, 
  varchar, 
  text, 
  timestamp, 
  boolean, 
  integer,
  uniqueIndex,
  primaryKey,
} = require('drizzle-orm/pg-core');

// Users Table
const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  instrument: varchar('instrument', { length: 100 }),
  profileImageUrl: varchar('profile_image_url', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Bands Table
const bands = pgTable('bands', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  logoUrl: varchar('logo_url', { length: 255 }),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Band Members Table
const bandMembers = pgTable('band_members', {
  id: uuid('id').primaryKey().defaultRandom(),
  bandId: uuid('band_id').references(() => bands.id).notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  role: varchar('role', { length: 50 }).notNull(), // 'leader', 'member', 'admin'
  joinedAt: timestamp('joined_at').defaultNow(),
}, (table) => {
  return {
    uniqueBandUser: uniqueIndex('unique_band_user').on(table.bandId, table.userId),
  };
});

// Rehearsals Table
const rehearsals = pgTable('rehearsals', {
  id: uuid('id').primaryKey().defaultRandom(),
  bandId: uuid('band_id').references(() => bands.id).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  location: varchar('location', { length: 255 }),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time').notNull(),
  isRecurring: boolean('is_recurring').default(false),
  recurrencePattern: varchar('recurrence_pattern', { length: 50 }),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Attendance Table
const attendance = pgTable('attendance', {
  id: uuid('id').primaryKey().defaultRandom(),
  rehearsalId: uuid('rehearsal_id').references(() => rehearsals.id).notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  status: varchar('status', { length: 50 }).notNull(), // 'confirmed', 'declined', 'tentative', 'no_response'
  notes: text('notes'),
  respondedAt: timestamp('responded_at'),
}, (table) => {
  return {
    uniqueRehearsalUser: uniqueIndex('unique_rehearsal_user').on(table.rehearsalId, table.userId),
  };
});

// Availability Table
const availability = pgTable('availability', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  dayOfWeek: integer('day_of_week').notNull(), // 0-6 for Sunday-Saturday
  startTime: varchar('start_time', { length: 8 }).notNull(), // HH:MM:SS
  endTime: varchar('end_time', { length: 8 }).notNull(), // HH:MM:SS
  isRecurring: boolean('is_recurring').default(true),
}, (table) => {
  return {
    uniqueAvailability: uniqueIndex('unique_availability').on(
      table.userId, 
      table.dayOfWeek, 
      table.startTime, 
      table.endTime
    ),
  };
});

// Setlists Table
const setlists = pgTable('setlists', {
  id: uuid('id').primaryKey().defaultRandom(),
  rehearsalId: uuid('rehearsal_id').references(() => rehearsals.id),
  name: varchar('name', { length: 255 }).notNull(),
  notes: text('notes'),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Songs Table
const songs = pgTable('songs', {
  id: uuid('id').primaryKey().defaultRandom(),
  bandId: uuid('band_id').references(() => bands.id).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  artist: varchar('artist', { length: 255 }),
  duration: integer('duration'), // in seconds
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Setlist Songs Table
const setlistSongs = pgTable('setlist_songs', {
  id: uuid('id').primaryKey().defaultRandom(),
  setlistId: uuid('setlist_id').references(() => setlists.id).notNull(),
  songId: uuid('song_id').references(() => songs.id).notNull(),
  position: integer('position').notNull(),
  notes: text('notes'),
}, (table) => {
  return {
    uniqueSetlistPosition: uniqueIndex('unique_setlist_position').on(table.setlistId, table.position),
  };
});

// Notifications Table
const notifications = pgTable('notifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  rehearsalId: uuid('rehearsal_id').references(() => rehearsals.id),
  type: varchar('type', { length: 50 }).notNull(), // 'reminder', 'change', 'cancellation'
  message: text('message').notNull(),
  isRead: boolean('is_read').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

// Notification Settings Table
const notificationSettings = pgTable('notification_settings', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull().unique(),
  emailNotifications: boolean('email_notifications').default(true),
  pushNotifications: boolean('push_notifications').default(true),
  reminderHours: integer('reminder_hours').default(24),
  rehearsalChanges: boolean('rehearsal_changes').default(true),
  newSetlists: boolean('new_setlists').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

module.exports = {
  users,
  bands,
  bandMembers,
  rehearsals,
  attendance,
  availability,
  setlists,
  songs,
  setlistSongs,
  notifications,
  notificationSettings,
};