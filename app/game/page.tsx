import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DecisionPanel from "@/components/DecisionPanel";
import LogoutButton from "@/components/LogoutButton";
import GameChart from "@/components/GameChart";
import { getOrCreateGame } from "@/lib/game/getOrCreateGame";
import ResetGameButton from "@/components/ResetGameButton";
import Leaderboard from "@/components/Leaderboard";
import OfficeVisualization from "@/components/OfficeVisualization";

export default async function GamePage() {
  const supabase = await createClient();

  // Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/signin");

  // Fetch the user's game
  const game = await getOrCreateGame(user.id);

  // Fetch game history for the chart
  const { data: history = [] } = await supabase
    .from("game_history")
    .select("*")
    .eq("game_id", game.id)
    .order("quarter", { ascending: true });

  const win = game.quarter >= 5 && game.cash > 0;

  return (
    <main className="min-h-screen p-8 flex flex-col gap-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-center">Startup Simulation</h1>

      {/* Top row */}
      <div className="grid grid-cols-2 gap-6">
        {/* Game stats */}
        <div className="border p-6 rounded transition hover:shadow-lg hover:-translate-y-1">
          <h2 className="text-lg font-semibold mb-3">Company Stats</h2>

          <p>Quarter: {game.quarter}</p>
          <p className="font-mono">Cash: ${game.cash}</p>
          <p>Engineers: {game.engineers}</p>
          <p>Sales Staff: {game.sales_staff}</p>
          <p>Product Quality: {game.quality}</p>
        </div>

        {/* Leaderboard */}
        <Leaderboard />
      </div>

      {/* Chart */}
      <div className="border p-6 rounded transition hover:shadow-lg">
        <GameChart history={history} />
      </div>

      {/* Office visualization */}
      <OfficeVisualization
        engineers={game.engineers}
        sales={game.sales_staff}
      />

      {/* Game over message */}
      {(game.game_over || win) && (
        <div
          className={`p-3 rounded text-center ${win ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}
        >
          {win
            ? "Congratulations — Your startup survived 10 years!"
            : "Game Over — Your startup ran out of cash."}
        </div>
      )}

      {win && (
        <div className="flex flex-col items-center gap-4">
          <div className="bg-green-100 p-4 rounded text-green-700 font-bold text-center">
            Victory — You reached Year 10 with a profitable startup!
            <br />
            Total Profit: ${game.cumulative_profit}
          </div>

          <ResetGameButton />
        </div>
      )}

      {/* Decision panel */}
      {!game.game_over && !win && <DecisionPanel />}

      {/* Logout */}
      <div className="flex justify-center">
        <LogoutButton />
      </div>
    </main>
  );
}
