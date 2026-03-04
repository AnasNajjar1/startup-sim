"use client";

import { useEffect, useState } from "react";

interface LeaderboardEntry {
  username: string;
  cumulative_profit: number;
}

export default function Leaderboard() {
  const [data, setData] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div className="border p-6 rounded w-80">
      <h2 className="text-xl font-semibold mb-4">Leaderboard</h2>

      <ol className="space-y-2">
        {data.map((entry, index) => (
          <li key={index} className="flex justify-between">
            <span>
              #{index + 1} {entry.username}
            </span>

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