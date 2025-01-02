import { Transaction, TimePeriod } from "@/types/transaction";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { DateRange } from "react-day-picker";
import { isWithinInterval, startOfDay, endOfDay } from "date-fns";

interface CategoryChartProps {
  transactions: Transaction[];
  timePeriod: TimePeriod;
  dateRange?: DateRange;
}

const COLORS = {
  income: ["#4A6741", "#82A878", "#B8D4B2"],
  expense: ["#E57373", "#EF9A9A", "#FFCDD2"],
};

const CategoryChart = ({ transactions, timePeriod, dateRange }: CategoryChartProps) => {
  const getFilteredTransactions = () => {
    if (dateRange?.from) {
      const start = startOfDay(dateRange.from);
      const end = dateRange.to ? endOfDay(dateRange.to) : endOfDay(dateRange.from);
      
      return transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return isWithinInterval(transactionDate, { start, end });
      });
    }
    return transactions;
  };

  const filteredTransactions = getFilteredTransactions();

  const categoryTotals = filteredTransactions.reduce((acc, transaction) => {
    const { category, amount, type } = transaction;
    if (!acc[type]) {
      acc[type] = {};
    }
    if (!acc[type][category]) {
      acc[type][category] = 0;
    }
    acc[type][category] += Math.abs(amount);
    return acc;
  }, {} as Record<string, Record<string, number>>);

  const getData = (type: "income" | "expense") => {
    if (!categoryTotals[type]) return [];
    return Object.entries(categoryTotals[type]).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const incomeData = getData("income");
  const expenseData = getData("expense");

  const renderChart = (data: Array<{ name: string; value: number }>, type: "income" | "expense") => {
    if (data.length === 0) {
      return (
        <p className="text-center text-muted-foreground h-full flex items-center justify-center">
          No {type} data to display
        </p>
      );
    }

    return (
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
              <Cell key={`cell-${index}`} fill={COLORS[type][index % COLORS[type].length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="h-[300px]">
        <h3 className="text-lg font-semibold mb-4 text-center">Income by Category</h3>
        {renderChart(incomeData, "income")}
      </div>
      <div className="h-[300px]">
        <h3 className="text-lg font-semibold mb-4 text-center">Expenses by Category</h3>
        {renderChart(expenseData, "expense")}
      </div>
    </div>
  );
};

export default CategoryChart;