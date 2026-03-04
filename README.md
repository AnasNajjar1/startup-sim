# Startup Simulation

A startup management simulation game built with a modern full-stack stack.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Supabase Authentication
- PostgreSQL
- TailwindCSS
- Recharts

## Features

- User authentication (Sign in / Sign up)
- Startup management simulation
- Quarterly decision engine
- Cash flow and profit calculation
- Game over conditions
- Historical chart visualization

## How the Simulation Works

Each quarter the player decides:

- Product price
- Engineers to hire
- Sales staff to hire
- Salary level relative to the industry average

The simulation then calculates:

- Market demand
- Units sold
- Revenue
- Payroll cost
- Net income
- Updated company cash balance

The company fails if cash reaches **0**.

## Setup

Clone the repository:

git clone https://github.com/AnasNajjar1/startup-sim

Install dependencies:

npm install

Add environment variables:

NEXT_PUBLIC_SUPABASE_URL=your_url  
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key

Run the development server:

npm run dev

Open the application:

http://localhost:3000

## Deployment

The project is deployed on **Vercel** and connected to **Supabase**.

Environment variables required:

NEXT_PUBLIC_SUPABASE_URL  
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY

## Assignment Write-Up

This project implements a simplified startup management simulation where the player makes quarterly decisions about pricing, hiring engineers and sales staff, and salary levels. Each decision influences demand, revenue, payroll, and ultimately the company’s survival. The goal is to reach Year 10 with positive cash while managing growth responsibly.

One technical decision I focused on was keeping the simulation logic strictly server-side. The client submits decisions through an API endpoint, and the server computes the results using the simulation formulas before persisting the updated state. This ensures the simulation cannot be manipulated from the browser and keeps the game state consistent across sessions.

If revisiting the project, I would extend the simulation with market randomness or competitor dynamics. These elements would introduce more strategic variability and replayability while maintaining the same architecture.