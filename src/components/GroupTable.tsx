import type { Group, Team } from "@/lib/api";

export function GroupTable({
  group,
  teams,
}: {
  group: Group;
  teams: Team[];
}) {
  const teamMap = new Map(teams.map((t) => [t.id, t]));

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-3 text-blue-400">
        Group {group.group}
      </h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-400 text-xs">
            <th className="text-left pb-2">Team</th>
            <th className="text-center pb-2">Pts</th>
            <th className="text-center pb-2">GF</th>
            <th className="text-center pb-2">GA</th>
          </tr>
        </thead>
        <tbody>
          {group.teams.map((standing) => {
            const team = teamMap.get(standing.team_id);
            return (
              <tr key={standing.team_id} className="border-t border-gray-800">
                <td className="py-2">{team?.name_en || "Unknown"}</td>
                <td className="text-center font-bold">{standing.pts}</td>
                <td className="text-center text-gray-400">{standing.gf}</td>
                <td className="text-center text-gray-400">{standing.ga}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}