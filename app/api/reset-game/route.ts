import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })

  // Get current game
  const { data: game } = await supabase
    .from("games")
    .select("*")
    .eq("user_id", user.id)
    .single()

  if (!game) {
    return NextResponse.json({ error: "Game not found" }, { status: 404 })
  }

  // Reset game state
  const { error } = await supabase
    .from("games")
    .update({
      quarter: 1,
      cash: 1000000,
      engineers: 4,
      sales_staff: 2,
      quality: 50,
      cumulative_profit: 0,
      game_over: false
    })
    .eq("id", game.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Clear old history
  await supabase
    .from("game_history")
    .delete()
    .eq("game_id", game.id)

  // Insert initial history again
  await supabase
    .from("game_history")
    .insert({
      game_id: game.id,
      quarter: 1,
      cash: 1000000,
      revenue: 0,
      net_income: 0,
      engineers: 4,
      sales_staff: 2
    })

  return NextResponse.json({ success: true })
}