"use client";

interface Props {
  engineers: number;
  sales: number;
}

export default function OfficeVisualization({ engineers, sales }: Props) {
  const totalDesks = 20; // office capacity

  const desks = [];

  for (let i = 0; i < totalDesks; i++) {
    if (i < engineers) desks.push("engineer");
    else if (i < engineers + sales) desks.push("sales");
    else desks.push("empty");
  }

  return (
    <div className="border p-6 rounded w-full max-w-xl">
      <h2 className="text-xl font-semibold mb-4">Office</h2>

      <div className="grid grid-cols-5 gap-3">
        {desks.map((desk, index) => {
          let color = "bg-gray-200";

          if (desk === "engineer") color = "bg-blue-400";
          if (desk === "sales") color = "bg-green-400";

          return (
            <div
              key={index}
              className={`h-12 w-12 rounded flex items-center justify-center text-white text-xs ${color} transition transform hover:scale-110 duration-200`}
            >
              {desk === "engineer" && "E"}
              {desk === "sales" && "S"}
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
