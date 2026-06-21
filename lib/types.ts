import type { LeadStatus } from '@/lib/pipeline';

export type Trip = {
  id: string;
  name: string;
  destination: string | null;
  start_date: string | null;
  end_date: string | null;
  price: number | null;
  total_seats: number | null;
  status: 'open' | 'closed';
  description: string | null;
  hero_image_url: string | null;
  created_at: string;
  updated_at: string;
};

export type Lead = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  trip_id: string | null;
  group_type: string | null;
  preferred_month: string | null;
  expectations: string | null;
  status: LeadStatus;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
};

export type CallNote = {
  id: string;
  lead_id: string;
  author_id: string | null;
  body: string;
  created_at: string;
};

export type Profile = { id: string; full_name: string; created_at: string };
