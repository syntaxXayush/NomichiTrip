export default function PublicLoading() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <div className="skeleton-shimmer h-72 animate-shimmer rounded-[28px]" />
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {[0, 1, 2].map((item) => <div key={item} className="skeleton-shimmer h-80 animate-shimmer rounded-2xl" />)}
      </div>
    </div>
  );
}
