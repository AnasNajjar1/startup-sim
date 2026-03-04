"use client";

interface Props {
  engineers: number;
  sales: number;
}

export default function OfficeVisualization({ engineers, sales }: Props) {
  const columns = 5;

  const employees = [
    ...Array(engineers).fill("engineer"),
    ...Array(sales).fill("sales"),
  ];

  // Calculate rows dynamically
  const rows = Math.ceil(employees.length / columns) || 1;
  const totalDesks = rows * columns;

  const desks = [];

  for (let i = 0; i < totalDesks; i++) {
    if (i < employees.length) desks.push(employees[i]);
    else desks.push("empty");
  }

  return (
    <div className="border p-6 rounded w-full max-w-xl transition-all duration-500">
      <h2 className="text-xl font-semibold mb-4">Office</h2>

      <div className="grid grid-cols-5 gap-3 transition-all duration-500">
        {desks.map((desk, index) => {
          let color = "bg-gray-200";
          let label = "";

          if (desk === "engineer") {
            color = "bg-blue-400";
            label = "E";
          }

          if (desk === "sales") {
            color = "bg-green-400";
            label = "S";
          }

          return (
            <div
              key={index}
              className={`h-12 w-12 rounded flex items-center justify-center text-white text-xs 
              ${color}
              transform transition-all duration-300 ease-out
              hover:scale-110
              animate-[fadeIn_0.3s_ease-out]`}
            >
              {label}
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-sm flex gap-4">
        <span className="flex items-center gap-1">
          <div className="h-3 w-3 bg-blue-400 rounded"></div> Engineer
        </span>

        <span className="flex items-center gap-1">
          <div className="h-3 w-3 bg-green-400 rounded"></div> Sales
        </span>

        <span className="flex items-center gap-1">
          <div className="h-3 w-3 bg-gray-200 rounded"></div> Empty
        </span>
      </div>
    </div>
  );
}