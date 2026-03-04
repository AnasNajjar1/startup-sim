import { createClient } from "@/lib/supabase/server";

export async function getOrCreateGame(userId: string) {
  const supabase = await createClient();

  // Check if game already exists
  const { data: existingGame } = await supabase
    .from("games")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (existingGame) return existingGame;

  // Try to create the game
  const { data: newGame, error } = await supabase
    .from("games")
    .insert({
      user_id: userId,
      cash: 1000000,
      engineers: 4,
      sales_staff: 2,
      quality: 50,
      quarter: 1,
      price: 100,
      salary_pct: 100,
      cumulative_profit: 0,
    })
    .select()
    .single();

  // Handle duplicate creation race condition
  if (error && error.code === "23505") {
    const { data: game } = await supabase
      .from("games")
      .select("*")
      .eq("user_id", userId)
      .single();

    return game;
  }

  // Handle other errors
  if (error || !newGame) {
    throw new Error("Failed to create game");
  }

  // Insert initial history row (Q1)
  await supabase.from("game_history").insert({
    game_id: newGame.id,
    quarter: 1,
    cash: newGame.cash,
    revenue: 0,
    net_income: 0,
    engineers: newGame.engineers,
    sales_staff: newGame.sales_staff,
  });

  return newGame;
}