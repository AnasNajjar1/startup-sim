"use client";

import { useEffect, useState } from "react";

interface LeaderboardEntry {
  user_id: string;
  cumulative_profit: number;
}

export default function Leaderboard() {
  const [data, setData] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    fetch("/api/leaderboard", { cache: "no-store" })
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div className="border p-6 rounded w-80">
      <h2 className="text-xl font-semibold mb-4">Leaderboard</h2>

      <ol className="space-y-2">
        {data.map((entry, index) => (
          <li key={entry.user_id} className="flex justify-between">
            <span>#{index + 1}</span>
            <span>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(entry.cumulative_profit)}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
