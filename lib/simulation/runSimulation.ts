import { GameState, Decisions, SimulationResult } from "./types";

/**
 * Runs one simulation step (one quarter) of the startup game.
 * It updates workforce, quality, demand, revenue, costs, and cash position.
 */
export function runSimulation(state: GameState, decisions: Decisions): SimulationResult {
  const INDUSTRY_SALARY = 30000;

  // Apply hiring decisions
  const engineers = state.engineers + decisions.engineers;
  const salesStaff = state.sales_staff + decisions.sales;

  // Salary cost per employee
  const salaryCost = (decisions.salaryPct / 100) * INDUSTRY_SALARY;

  // Product quality improvement
  let quality = state.quality + engineers * 0.5;

  // Cap quality at 100
  quality = Math.min(quality, 100);

  // Market demand formula
  let demand = quality * 10 - decisions.price * 0.0001;

  // Demand floor
  demand = Math.max(demand, 0);

  // Units sold
  const unitsSold = Math.floor(demand * salesStaff * 0.5);

  // Revenue
  const revenue = decisions.price * unitsSold;

  // Payroll cost
  const payroll = salaryCost * (engineers + salesStaff);

  // Net income
  const netIncome = revenue - payroll;

  // Hiring cost (one-time)
  const hireCost = (decisions.engineers + decisions.sales) * 5000;

  // Updated cash
  const cash = state.cash + netIncome - hireCost;

  // Track cumulative profit
  const cumulativeProfit = state.cumulative_profit + netIncome;

  // Advance quarter
  const nextQuarter = state.quarter + 1;

  // Win / lose conditions
  const lose = cash <= 0;
  const win = nextQuarter >= 40 && cash > 0;

  const gameOver = lose || win;

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