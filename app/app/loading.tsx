export default function AppLoading() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="skeleton-shimmer h-28 animate-shimmer rounded-2xl" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((item) => <div key={item} className="skeleton-shimmer h-36 animate-shimmer rounded-2xl" />)}
      </div>
      <div className="mt-6 skeleton-shimmer h-96 animate-shimmer rounded-2xl" />
    </div>
  );
}
