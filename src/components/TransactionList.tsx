import { Transaction, TimePeriod } from "@/types/transaction";
import { format, isWithinInterval, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";

const TransactionList = ({ transactions, timePeriod }: { transactions: Transaction[]; timePeriod: TimePeriod }) => {
  const getFilteredTransactions = () => {
    const now = new Date();
    let interval: { start: Date; end: Date };

    switch (timePeriod) {
      case "daily":
        interval = {
          start: startOfDay(now),
          end: endOfDay(now)
        };
        break;
      case "weekly":
        interval = {
          start: startOfWeek(now),
          end: endOfWeek(now)
        };
        break;
      case "monthly":
        interval = {
          start: startOfMonth(now),
          end: endOfMonth(now)
        };
        break;
      case "yearly":
        interval = {
          start: startOfYear(now),
          end: endOfYear(now)
        };
        break;
      default:
        return transactions;
    }

    return transactions.filter(transaction =>
      isWithinInterval(new Date(transaction.date), interval)
    );
  };

  const filteredTransactions = getFilteredTransactions();

  return (
    <ScrollArea className="h-[400px] rounded-md border">
      <div className="space-y-4 p-4">
        {filteredTransactions.length === 0 ? (
          <p className="text-center text-muted-foreground">No transactions for this time period</p>
        ) : (
          filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-lg bg-white/50 backdrop-blur-sm border transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`w-2 h-2 mt-2 rounded-full ${
                    transaction.type === "income" ? "bg-income" : "bg-expense"
                  }`}
                />
                <div>
                  <p className="font-medium">{transaction.category}</p>
                  <p className="text-sm text-muted-foreground">{transaction.description || "No description"}</p>
                  <p className="text-xs text-muted-foreground">{format(new Date(transaction.date), "PPp")}</p>
                </div>
              </div>
              <p
                className={`font-semibold ${
                  transaction.type === "income" ? "text-income" : "text-expense"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
              </p>
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  );
};

export default TransactionList;