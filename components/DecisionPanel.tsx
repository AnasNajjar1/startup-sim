"use client";

import { useState } from "react";

export default function DecisionPanel() {
  const [price, setPrice] = useState("100");
  const [engineers, setEngineers] = useState("");
  const [sales, setSales] = useState("");
  const [salaryPct, setSalaryPct] = useState("100");

  const [revenue, setRevenue] = useState<number | null>(null);
  const [netIncome, setNetIncome] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const parsedPrice = Number(price);
    const parsedEngineers = Number(engineers || 0);
    const parsedSales = Number(sales || 0);
    const parsedSalary = Number(salaryPct);

    if (parsedPrice <= 0) {
      alert("Price must be greater than 0");
      return;
    }

    if (parsedEngineers < 0) {
      alert("Engineers hired cannot be negative");
      return;
    }

    if (parsedSales < 0) {
      alert("Sales staff hired cannot be negative");
      return;
    }

    if (parsedSalary < 50 || parsedSalary > 200) {
      alert("Salary percentage must be between 50 and 200");
      return;
    }

    const decisions = {
      price: parsedPrice,
      engineers: parsedEngineers,
      sales: parsedSales,
      salaryPct: parsedSalary,
    };

    try {
      setLoading(true);

      const res = await fetch("/api/advance-quarter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(decisions),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.error || "Simulation failed");
        setLoading(false);
        return;
      }

      const data = await res.json();

      setRevenue(data.revenue);
      setNetIncome(data.netIncome);

      setTimeout(() => {
        window.location.reload();
      }, 4000);
    } catch (err) {
      alert("Unexpected error occurred");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 border p-6 rounded w-80"
      >
        <h2 className="text-xl font-semibold">Quarterly Decisions</h2>

        <label className="flex flex-col text-sm">
          Unit Price
          <input
            type="number"
            min="1"
            className="border p-2"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>

        <label className="flex flex-col text-sm">
          New Engineers to Hire
          <input
            type="number"
            min="0"
            className="border p-2"
            value={engineers}
            onChange={(e) => setEngineers(e.target.value)}
            placeholder="0"
          />
        </label>

        <label className="flex flex-col text-sm">
          New Sales Staff to Hire
          <input
            type="number"
            min="0"
            className="border p-2"
            value={sales}
            onChange={(e) => setSales(e.target.value)}
            placeholder="0"
          />
        </label>

        <label className="flex flex-col text-sm">
          Salary (% of industry average)
          <input
            type="number"
            min="50"
            max="200"
            className="border p-2"
            value={salaryPct}
            onChange={(e) => setSalaryPct(e.target.value)}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white p-2 cursor-pointer hover:bg-gray-800 transition"
        >
          {loading ? "Running Simulation..." : "Advance Quarter"}
        </button>

        {revenue !== null && (
          <div className="bg-green-50 p-4 rounded border mt-4">
            <p>Revenue: ${revenue}</p>
            <p>Net Income: ${netIncome}</p>
          </div>
        )}
      </form>
    </div>
  );
}