import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("games")
    .select("username, cumulative_profit")
    .gt("quarter", 1)
    .order("cumulative_profit", { ascending: false })
    .limit(10);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const leaderboard =
    data?.map((entry) => ({
      username: entry.username || "player",
      cumulative_profit: entry.cumulative_profit,
    })) ?? [];

  return NextResponse.json(leaderboard);
}