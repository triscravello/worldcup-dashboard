import type { Match } from "@/lib/api";

function getStatusBadge(match: Match) {
  if (match.finished === "TRUE") {
    return <span className="text-xs px-2 py-1 bg-gray-700 rounded">FT</span>;
  }
  if (match.time_elapsed !== "notstarted") {
    return (
      <span className="text-xs px-2 py-1 bg-red-600 rounded animate-pulse">
        {match.time_elapsed}
      </span>
    );
  }
  return (
    <span className="text-xs px-2 py-1 bg-gray-700 rounded">
      {match.local_date}
    </span>
  );
}

export function MatchCard({ match }: { match: Match }) {
  const homeName = match.home_team_name_en || match.home_team_label || "TBD";
  const awayName = match.away_team_name_en || match.away_team_label || "TBD";

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs text-gray-400 uppercase">
          {match.type === "group" ? `Group ${match.group}` : match.group}
        </span>
        {getStatusBadge(match)}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium w-28 truncate">{homeName}</span>
        <span className="text-lg font-bold mx-4">
          {match.home_score} - {match.away_score}
        </span>
        <span className="text-sm font-medium w-28 truncate text-right">
          {awayName}
        </span>
      </div>
    </div>
  );
}