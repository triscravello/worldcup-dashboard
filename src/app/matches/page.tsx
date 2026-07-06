import { getMatches } from "@/lib/api";
import { MatchCard } from "@/components/MatchCard";

export default async function MatchesPage() {
  const matches = await getMatches();

  const stages = [
    { label: "Group Stage", types: ["group"] },
    { label: "Round of 32", types: ["r32"] },
    { label: "Round of 16", types: ["r16"] },
    { label: "Quarter-finals", types: ["qf"] },
    { label: "Semi-finals", types: ["sf"] },
    { label: "Third Place", types: ["third"] },
    { label: "Final", types: ["final"] },
  ];

  return (
    <main className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-8">All Matches</h1>
      {stages.map((stage) => {
        const stageMatches = matches.filter((m) =>
          stage.types.includes(m.type)
        );
        if (stageMatches.length === 0) return null;
        return (
          <section key={stage.label} className="mb-10">
            <h2 className="text-2xl font-semibold text-purple-400 mb-4">
              {stage.label}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stageMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}