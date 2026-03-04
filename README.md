# Startup Simulation

A startup management simulation game built with modern full-stack tools.

## Tech Stack

* Next.js (App Router)
* TypeScript
* Supabase Authentication
* PostgreSQL
* TailwindCSS
* Recharts

## Features

* User authentication (Sign in / Sign up)
* Startup management simulation
* Quarterly decision engine
* Cash flow and profit calculation
* Game over conditions
* Historical chart visualization

## How the Simulation Works

Each quarter the player decides:

* Product price
* Engineers to hire
* Sales staff to hire
* Salary level relative to industry average

The simulation calculates:

* Market demand
* Units sold
* Revenue
* Payroll cost
* Net income
* Updated company cash

The company fails if cash reaches **0**.

## Local Development

Install dependencies:

npm install

Run development server:

npm run dev

Open:

http://localhost:3000

## Deployment

The project is deployed using Vercel and connected to Supabase.

Environment variables required:

NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
