export function getTripImage(name: string, image?: string | null) {
  if (image) return image;
  const lower = name.toLowerCase();
  if (lower.includes('spiti')) {
    return 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=82&w=1800&auto=format&fit=crop';
  }
  if (lower.includes('backwater') || lower.includes('kerala')) {
    return 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=82&w=1800&auto=format&fit=crop';
  }
  if (lower.includes('ladakh')) {
    return 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=82&w=1800&auto=format&fit=crop';
  }
  return 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=82&w=1800&auto=format&fit=crop';
}

export const HERO_IMAGES = {
  primary: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=84&w=1800&auto=format&fit=crop',
  secondary: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=84&w=1200&auto=format&fit=crop',
};
