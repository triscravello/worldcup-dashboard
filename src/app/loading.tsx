export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-950 text-white p-6">
      <div className="animate-pulse">
        <div className="h-10 bg-gray-800 rounded w-96 mx-auto mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-32 bg-gray-800 rounded-lg" />
          ))}
        </div>
      </div>
    </main>
  );
}