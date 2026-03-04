"use client";

import { useState } from "react";

export default function ResetGameButton() {
  const [loading, setLoading] = useState(false);

  async function resetGame() {
    if (loading) return;
    setLoading(true);

    const res = await fetch("/api/reset-game", { method: "POST" });

    setLoading(false);

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      alert(body?.error || "Failed to reset game");
      return;
    }

    window.location.reload();
  }

  return (
    <button
      onClick={resetGame}
      disabled={loading}
      className="bg-black text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-800 transition duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Resetting..." : "Start New Game"}
    </button>
  );
}