import { useState } from "react";
import { Card } from "@/components/ui/card";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import CategoryChart from "@/components/CategoryChart";
import TimeSelector from "@/components/TimeSelector";
import { TimePeriod, Transaction } from "@/types/transaction";

const Index = () => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("daily");
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 animate-fadeIn">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center mb-8">Expense Tracker</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6 backdrop-blur-sm bg-white/50 animate-slideIn">
            <h2 className="text-2xl font-semibold mb-4">Add Transaction</h2>
            <TransactionForm onSubmit={addTransaction} />
          </Card>
          
          <Card className="p-6 backdrop-blur-sm bg-white/50 animate-slideIn">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <CategoryChart transactions={transactions} timePeriod={timePeriod} />
          </Card>
        </div>

        <Card className="p-6 backdrop-blur-sm bg-white/50 animate-slideIn">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Transactions</h2>
            <TimeSelector value={timePeriod} onChange={setTimePeriod} />
          </div>
          <TransactionList transactions={transactions} timePeriod={timePeriod} />
        </Card>
      </div>
    </div>
  );
};

export default Index;