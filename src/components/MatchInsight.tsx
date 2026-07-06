"use client";

import { useState } from "react";

export function MatchInsight({ matchId }: { matchId: string }) {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch an AI tactical summary from the API route
  async function fetchInsight() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matchId }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to fetch insight");
      }

      const data = await response.json();
      setInsight(data.insight);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  // Once an insight is loaded, display it in a styled card
  if (insight) {
    return (
      <div className="mt-3 p-3 bg-gray-800 rounded border border-gray-700">
        <p className="text-xs text-purple-400 font-semibold mb-1">
          AI Match Insight
        </p>
        <p className="text-sm text-gray-300">{insight}</p>
      </div>
    );
  }

  // Default state: show the request button
  return (
    <button
      onClick={fetchInsight}
      disabled={loading}
      className="mt-3 text-xs px-3 py-1 bg-purple-700 rounded hover:bg-purple-600 disabled:opacity-50 transition"
    >
      {loading ? "Generating..." : "Get AI Insight"}
    </button>
  );
}