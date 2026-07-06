import { getGroups, getTeams } from "@/lib/api";
import { GroupTable } from "@/components/GroupTable";

export default async function GroupsPage() {
  const [groups, teams] = await Promise.all([getGroups(), getTeams()]);

  return (
    <main className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Group Standings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <GroupTable key={group.group} group={group} teams={teams} />
        ))}
      </div>
    </main>
  );
}