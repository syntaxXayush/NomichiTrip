import { z } from 'zod';

export const tripSchema = z.object({
  name: z.string().min(2).max(160),
  destination: z.string().min(2).max(120),
  start_date: z.string().min(1),
  end_date: z.string().min(1),
  price: z.coerce.number().positive(),
  total_seats: z.coerce.number().int().positive(),
  status: z.enum(['open', 'closed']),
  description: z.string().min(10).max(5000),
  hero_image_url: z.string().url().optional().or(z.literal('')),
}).refine((trip) => trip.end_date >= trip.start_date, {
  message: 'End date must be on or after the start date',
  path: ['end_date'],
});

export const leadStatusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(['new', 'contacted', 'qualified', 'vibe_check_sent', 'confirmed', 'not_a_fit']),
});

export const callNoteSchema = z.object({
  lead_id: z.string().uuid(),
  body: z.string().min(1),
});

export const enquirySchema = z.object({
  trip_id: z.string().uuid('Choose a valid trip'),
  name: z.string().min(2, 'Name is required').max(100),
  phone: z
    .string()
    .min(8, 'Enter a valid phone number')
    .max(20)
    .regex(/^[+]?[0-9\s-]{8,15}$/, 'Use digits, spaces, +, or - only'),
  email: z.string().email('Enter a valid email address').optional().or(z.literal('')),
  group_type: z.enum(['Solo', 'Couple', 'Friends', 'Family'], {
    message: 'Tell us who is travelling',
  }),
  preferred_month: z.string().min(2, 'Add your preferred month').max(40),
  expectations: z.string().min(10, 'Share a little more so we can help').max(2000),
});
