export interface GameState {
  quarter: number
  cash: number
  engineers: number
  sales_staff: number
  quality: number
  cumulative_profit: number
}

export interface Decisions {
  price: number
  engineers: number
  sales: number
  salaryPct: number
}

export interface SimulationResult {
  quarter: number
  cash: number
  engineers: number
  sales_staff: number
  quality: number
  revenue: number
  netIncome: number
  cumulative_profit: number
  game_over: boolean
}