export const formatPrice = (n: number | null, withGst = false) =>
  n == null
    ? 'On request'
    : `${new Intl.NumberFormat('en-IN', {
        style: 'currency', currency: 'INR', maximumFractionDigits: 0,
      }).format(n)}${withGst ? ' · incl. GST' : ''}`;

export const formatDateRange = (s: string | null, e: string | null, withYear = true) => {
  if (!s) return 'Dates flexible';
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    ...(withYear ? { year: 'numeric' } : {}),
  };
  const f = (d: string) =>
    new Date(`${d}T00:00:00`).toLocaleDateString('en-IN', options);
  return e ? `${f(s)} – ${f(e)}` : f(s);
};

export const tripDuration = (s: string | null, e: string | null) => {
  if (!s || !e) return null;
  const days = Math.round(
    (new Date(`${e}T00:00:00`).getTime() - new Date(`${s}T00:00:00`).getTime()) / 86400000
  ) + 1;
  return days > 0 ? `${days} days` : null;
};

export const timeAgo = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
};
