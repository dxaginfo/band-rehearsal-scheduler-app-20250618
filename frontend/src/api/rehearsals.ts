/**
 * Rehearsal API service
 */

import axios from 'axios';
import { 
  Rehearsal, 
  CreateRehearsalRequest, 
  UpdateRehearsalRequest,
  UpdateAttendanceRequest,
  RehearsalAttendee
} from '@/types/rehearsal';

// Create base API instance
const rehearsalApi = axios.create({
  baseURL: `${process.env.API_URL}/rehearsals`,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Add auth token to requests
 */
const getAuthHeader = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

/**
 * Get rehearsals for a band
 */
export const getBandRehearsals = async (bandId: string, token: string): Promise<Rehearsal[]> => {
  const response = await rehearsalApi.get(`/band/${bandId}`, getAuthHeader(token));
  return response.data;
};

/**
 * Get all rehearsals for the current user
 */
export const getUserRehearsals = async (token: string): Promise<Rehearsal[]> => {
  const response = await rehearsalApi.get('/user', getAuthHeader(token));
  return response.data;
};

/**
 * Get upcoming rehearsals for the current user
 */
export const getUpcomingRehearsals = async (token: string): Promise<Rehearsal[]> => {
  const response = await rehearsalApi.get('/user/upcoming', getAuthHeader(token));
  return response.data;
};

/**
 * Get rehearsal by ID
 */
export const getRehearsalById = async (rehearsalId: string, token: string): Promise<Rehearsal> => {
  const response = await rehearsalApi.get(`/${rehearsalId}`, getAuthHeader(token));
  return response.data;
};

/**
 * Create a new rehearsal
 */
export const createRehearsal = async (data: CreateRehearsalRequest, token: string): Promise<Rehearsal> => {
  const response = await rehearsalApi.post('/', data, getAuthHeader(token));
  return response.data;
};

/**
 * Update a rehearsal
 */
export const updateRehearsal = async (
  rehearsalId: string, 
  data: UpdateRehearsalRequest, 
  token: string
): Promise<Rehearsal> => {
  const response = await rehearsalApi.put(`/${rehearsalId}`, data, getAuthHeader(token));
  return response.data;
};

/**
 * Delete a rehearsal
 */
export const deleteRehearsal = async (rehearsalId: string, token: string): Promise<{ message: string }> => {
  const response = await rehearsalApi.delete(`/${rehearsalId}`, getAuthHeader(token));
  return response.data;
};

/**
 * Update attendance status for a rehearsal
 */
export const updateAttendance = async (
  rehearsalId: string,
  data: UpdateAttendanceRequest,
  token: string
): Promise<RehearsalAttendee> => {
  const response = await rehearsalApi.put(`/${rehearsalId}/attendance`, data, getAuthHeader(token));
  return response.data;
};

/**
 * Get attendees for a rehearsal
 */
export const getRehearsalAttendees = async (rehearsalId: string, token: string): Promise<RehearsalAttendee[]> => {
  const response = await rehearsalApi.get(`/${rehearsalId}/attendees`, getAuthHeader(token));
  return response.data;
};

/**
 * Send rehearsal reminders to all attendees
 */
export const sendRehearsalReminders = async (rehearsalId: string, token: string): Promise<{ message: string }> => {
  const response = await rehearsalApi.post(`/${rehearsalId}/reminders`, {}, getAuthHeader(token));
  return response.data;
};