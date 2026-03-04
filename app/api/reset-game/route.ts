import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  const supabase = await createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError) {
    return NextResponse.json({ error: userError.message }, { status: 500 });
  }

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Get current game
  const { data: game, error: gameError } = await supabase
    .from("games")
    .select("id, user_id")
    .eq("user_id", user.id)
    .single();

  if (gameError) {
    return NextResponse.json({ error: gameError.message }, { status: 500 });
  }

  if (!game) {
    return NextResponse.json({ error: "Game not found" }, { status: 404 });
  }

  // Clear old history first (optional order, but consistent)
  const { error: deleteError } = await supabase
    .from("game_history")
    .delete()
    .eq("game_id", game.id);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  // Reset game state
  const { error: updateError } = await supabase
    .from("games")
    .update({
      quarter: 1,
      cash: 1000000,
      engineers: 4,
      sales_staff: 2,
      quality: 50,
      cumulative_profit: 0,
      game_over: false,
    })
    .eq("id", game.id)
    .eq("user_id", user.id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  // Insert initial history again
  const { error: insertError } = await supabase.from("game_history").insert({
    game_id: game.id,
    quarter: 1,
    cash: 1000000,
    revenue: 0,
    net_income: 0,
    engineers: 4,
    sales_staff: 2,
  });

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}