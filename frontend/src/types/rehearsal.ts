/**
 * Rehearsal types for the application
 */

import { User } from './auth';

/**
 * Band information
 */
export interface Band {
  id: string;
  name: string;
  description?: string;
  logoUrl?: string;
  createdAt: string;
  createdBy: string;
  updatedAt?: string;
}

/**
 * Band member with role
 */
export interface BandMember {
  id: string;
  bandId: string;
  userId: string;
  role: BandRole;
  joinedAt: string;
  user?: User;
}

/**
 * Band member roles
 */
export type BandRole = 'leader' | 'manager' | 'member';

/**
 * Rehearsal location
 */
export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  postalCode?: string;
  notes?: string;
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
}

/**
 * Rehearsal session
 */
export interface Rehearsal {
  id: string;
  bandId: string;
  title: string;
  description?: string;
  startDateTime: string;
  endDateTime: string;
  locationId?: string;
  location?: Location;
  status: RehearsalStatus;
  notes?: string;
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
  attendees?: RehearsalAttendee[];
  band?: Band;
}

/**
 * Rehearsal status options
 */
export type RehearsalStatus = 'scheduled' | 'canceled' | 'completed' | 'postponed';

/**
 * Rehearsal attendee with attendance status
 */
export interface RehearsalAttendee {
  id: string;
  rehearsalId: string;
  userId: string;
  status: AttendanceStatus;
  responseTime?: string;
  notes?: string;
  user?: User;
}

/**
 * Attendance status options
 */
export type AttendanceStatus = 'attending' | 'not_attending' | 'tentative' | 'no_response';

/**
 * Rehearsal notification
 */
export interface RehearsalNotification {
  id: string;
  rehearsalId: string;
  userId: string;
  type: NotificationType;
  sentAt: string;
  readAt?: string;
  rehearsal?: Rehearsal;
  user?: User;
}

/**
 * Notification type options
 */
export type NotificationType = 'reminder' | 'cancellation' | 'rescheduled' | 'note_added';

/**
 * Create rehearsal request payload
 */
export interface CreateRehearsalRequest {
  bandId: string;
  title: string;
  description?: string;
  startDateTime: string;
  endDateTime: string;
  locationId?: string;
  notes?: string;
}

/**
 * Update rehearsal request payload
 */
export interface UpdateRehearsalRequest {
  title?: string;
  description?: string;
  startDateTime?: string;
  endDateTime?: string;
  locationId?: string;
  status?: RehearsalStatus;
  notes?: string;
}

/**
 * Update attendance status request payload
 */
export interface UpdateAttendanceRequest {
  status: AttendanceStatus;
  notes?: string;
}