import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DecisionPanel from "@/components/DecisionPanel";
import LogoutButton from "@/components/LogoutButton";
import GameChart from "@/components/GameChart";
import { getOrCreateGame } from "@/lib/game/getOrCreateGame";

export default async function GamePage() {
  const supabase = await createClient();

  // Get authenticated user
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/signin");

  // Fetch the user's game
  const game = await getOrCreateGame(user.id);

  // Fetch game history for the chart
  const { data: history = [] } = await supabase
    .from("game_history")
    .select("*")
    .eq("game_id", game.id)
    .order("quarter", { ascending: true });

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 p-8">
      <h1 className="text-3xl font-bold">Startup Simulation</h1>

      <div className="border p-6 rounded text-left w-80">
        <p>Quarter: {game.quarter}</p>
        <p>Cash: ${game.cash}</p>
        <p>Engineers: {game.engineers}</p>
        <p>Sales Staff: {game.sales_staff}</p>
        <p>Product Quality: {game.quality}</p>
      </div>

      {game.game_over && (
        <div className="bg-red-100 p-4 rounded text-red-700 font-bold">
          Game Over — Your startup ran out of cash.
        </div>
      )}

      {!game.game_over && <DecisionPanel />}

      <GameChart history={history} />

      <LogoutButton />
    </main>
  );
}
