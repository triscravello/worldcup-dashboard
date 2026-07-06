import Link from "next/link";

export function Nav() {
  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center gap-6">
        <Link href="/" className="text-xl font-bold text-white">
          WC2026
        </Link>
        <Link
          href="/groups"
          className="text-gray-300 hover:text-white transition"
        >
          Groups
        </Link>
        <Link
          href="/matches"
          className="text-gray-300 hover:text-white transition"
        >
          All Matches
        </Link>
      </div>
    </nav>
  );
}