import { Transaction, TimePeriod } from "@/types/transaction";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const COLORS = ["#4A6741", "#82A878", "#B8D4B2", "#E57373", "#EF9A9A", "#FFCDD2"];

const CategoryChart = ({ transactions, timePeriod }: { transactions: Transaction[]; timePeriod: TimePeriod }) => {
  const categoryTotals = transactions.reduce((acc, transaction) => {
    const { category, amount, type } = transaction;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += type === "income" ? amount : -amount;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value: Math.abs(value),
  }));

  return (
    <div className="w-full h-[300px]">
      {data.length === 0 ? (
        <p className="text-center text-muted-foreground h-full flex items-center justify-center">
          No data to display
        </p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              animationDuration={500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default CategoryChart;