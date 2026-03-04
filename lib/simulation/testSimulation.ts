console.log("Simulation test running...");

import { runSimulation } from "./runSimulation";

const currentGame = {
  quarter: 1,
  cash: 1000000,
  engineers: 4,
  sales_staff: 2,
  quality: 50,
  cumulative_profit: 0,
};

const decisions = {
  price: 100,
  engineers: 2,
  sales: 1,
  salaryPct: 100,
};

console.log(runSimulation(currentGame, decisions));
