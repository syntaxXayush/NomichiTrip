'use server';

import { createClient } from '@/lib/supabase/server';

export type UploadState = { url?: string; error?: string };

export async function uploadTripImage(
  _prev: UploadState,
  formData: FormData
): Promise<UploadState> {
  const file = formData.get('file') as File | null;
  if (!file || file.size === 0) return { error: 'No file selected.' };
  if (file.size > 5 * 1024 * 1024) return { error: 'Image must be under 5MB.' };
  if (!file.type.startsWith('image/')) return { error: 'Please choose an image file.' };

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authorised.' };

  const ext = file.name.split('.').pop() ?? 'jpg';
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from('trip-images')
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) return { error: 'Upload failed. Try again.' };

  const { data } = supabase.storage.from('trip-images').getPublicUrl(path);
  return { url: data.publicUrl };
}
