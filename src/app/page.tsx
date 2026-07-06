import { getMatches } from "@/lib/api";
import { MatchCard } from "@/components/MatchCard";

export default async function Home() {
  const matches = await getMatches();

  const liveMatches = matches.filter(
    (m) => m.finished === "FALSE" && m.time_elapsed !== "notstarted"
  );
  const recentMatches = matches
    .filter((m) => m.finished === "TRUE")
    .slice(-6);
  const upcomingMatches = matches
    .filter((m) => m.finished === "FALSE" && m.time_elapsed === "notstarted")
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        FIFA World Cup 2026 Dashboard
      </h1>

      {liveMatches.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-red-400 mb-4">
            Live Now
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">
          Recent Results
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-blue-400 mb-4">
          Upcoming Matches
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>
    </main>
  );
}