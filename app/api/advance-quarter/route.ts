import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { runSimulation } from "@/lib/simulation/runSimulation";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    // Get authenticated user
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    let body;

    // Safely parse JSON body
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const decisions = {
      price: Number(body.price),
      engineers: Number(body.engineers),
      sales: Number(body.sales),
      salaryPct: Number(body.salaryPct),
    };

    // Validation

    if (isNaN(decisions.price) || decisions.price <= 0) {
      return NextResponse.json({ error: "Invalid price" }, { status: 400 });
    }

    if (
      isNaN(decisions.engineers) ||
      isNaN(decisions.sales) ||
      decisions.engineers < 0 ||
      decisions.sales < 0
    ) {
      return NextResponse.json({ error: "Hiring numbers cannot be negative" }, { status: 400 });
    }

    if (
      isNaN(decisions.salaryPct) ||
      decisions.salaryPct < 50 ||
      decisions.salaryPct > 200
    ) {
      return NextResponse.json({ error: "Salary percentage out of range" }, { status: 400 });
    }

    // Fetch user's game
    const { data: game } = await supabase
      .from("games")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (!game) return NextResponse.json({ error: "Game not found" }, { status: 404 });

    // Prevent playing after game over
    if (game.game_over) {
      return NextResponse.json({ error: "Game already finished" }, { status: 400 });
    }

    // Run simulation
    const result = runSimulation(game, decisions);

    // Update game
    const { data: updatedGame, error } = await supabase
      .from("games")
      .update({
        quarter: result.quarter,
        cash: result.cash,
        engineers: result.engineers,
        sales_staff: result.sales_staff,
        quality: result.quality,
        cumulative_profit: result.cumulative_profit,
        game_over: result.game_over,
      })
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) {
      console.error("Game update error:", error);
      return NextResponse.json({ error: "Failed to update game" }, { status: 500 });
    }

    // Insert history record
    const { error: historyError } = await supabase
      .from("game_history")
      .insert({
        game_id: game.id,
        quarter: result.quarter,
        cash: result.cash,
        revenue: result.revenue,
        net_income: result.netIncome,
        engineers: result.engineers,
        sales_staff: result.sales_staff,
      });

    if (historyError) console.error("History insert failed:", historyError);

    return NextResponse.json({ game: updatedGame, revenue: result.revenue, netIncome: result.netIncome });

  } catch (err) {
    console.error("Unexpected error:", err);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}