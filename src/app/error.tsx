"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-gray-950 text-white p-6 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-red-400 mb-4">
        Something went wrong
      </h2>
      <p className="text-gray-400 mb-6">{error.message}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
      >
        Try again
      </button>
    </main>
  );
}