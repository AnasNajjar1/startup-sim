import { GameState, Decisions, SimulationResult } from "./types";

/**
 * Runs one simulation step (one quarter) of the startup game.
 * It updates workforce, quality, demand, revenue, costs, and cash position.
 */
export function runSimulation(state: GameState, decisions: Decisions): SimulationResult {
  // Base industry salary used as reference for payroll calculation
  const INDUSTRY_SALARY = 30000;

  // Updated workforce after hiring decisions
  const engineers = state.engineers + decisions.engineers;
  const salesStaff = state.sales_staff + decisions.sales;

  // Player-selected salary percentage relative to industry salary
  const salaryCost = (decisions.salaryPct / 100) * INDUSTRY_SALARY;

  // Product quality improves as more engineers work on the product
  let quality = state.quality + engineers * 0.5;

  // Cap quality at a maximum of 100
  quality = Math.min(quality, 100);

  // Market demand is influenced positively by product quality
  // and negatively by higher pricing
  let demand = quality * 10 - decisions.price * 0.0001;

  // Demand cannot be negative
  demand = Math.max(demand, 0);

  // Units sold depend on market demand and size of the sales team
  const unitsSold = Math.floor(demand * salesStaff * 0.5);

  // Revenue generated from units sold at the chosen price
  const revenue = decisions.price * unitsSold;

  // Total payroll cost for engineers and sales staff
  const payroll = salaryCost * (engineers + salesStaff);

  // Net income after paying salaries
  const netIncome = revenue - payroll;

  // Hiring cost penalty for recruiting new employees
  const hireCost = (decisions.engineers + decisions.sales) * 5000;

  // Updated cash position after profit/loss and hiring costs
  const cash = state.cash + netIncome - hireCost;

  // Running cumulative profit across all quarters
  const cumulativeProfit = state.cumulative_profit + netIncome;

  // Advance the simulation to the next quarter
  const nextQuarter = state.quarter + 1;

  // Game ends if company goes bankrupt or reaches quarter limit
  const gameOver = cash <= 0 || nextQuarter >= 12;

  // Return the updated game state and financial results
  return {
    quarter: nextQuarter,
    cash,
    engineers,
    sales_staff: salesStaff,
    quality,
    revenue,
    netIncome,
    cumulative_profit: cumulativeProfit,
    game_over: gameOver,
  };
}
