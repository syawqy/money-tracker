import { useState } from "react";
import { Card } from "@/components/ui/card";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import CategoryChart from "@/components/CategoryChart";
import CategoryManager from "@/components/CategoryManager";
import TimeSelector from "@/components/TimeSelector";
import DateRangeSelector from "@/components/DateRangeSelector";
import { TimePeriod, Transaction, TransactionType } from "@/types/transaction";
import { useToast } from "@/components/ui/use-toast";
import { DateRange } from "react-day-picker";

const defaultCategories = {
  income: ["Salary", "Freelance", "Investments", "Other"],
  expense: ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Other"],
};

const Index = () => {
  const { toast } = useToast();
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("daily");
  const [dateRange, setDateRange] = useState<DateRange>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState(defaultCategories);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  const addCategory = (type: TransactionType, category: string) => {
    setCategories((prev) => ({
      ...prev,
      [type]: [...prev[type], category],
    }));
  };

  const updateCategory = (type: TransactionType, oldCategory: string, newCategory: string) => {
    setCategories((prev) => ({
      ...prev,
      [type]: prev[type].map((cat) => (cat === oldCategory ? newCategory : cat)),
    }));

    setTransactions((prev) =>
      prev.map((transaction) => {
        if (transaction.type === type && transaction.category === oldCategory) {
          return { ...transaction, category: newCategory };
        }
        return transaction;
      })
    );
  };

  const deleteCategory = (type: TransactionType, categoryToDelete: string) => {
    const hasTransactions = transactions.some(
      (transaction) => transaction.type === type && transaction.category === categoryToDelete
    );

    if (hasTransactions) {
      toast({
        title: "Cannot Delete Category",
        description: "There are transactions using this category. Please update or delete those transactions first.",
        variant: "destructive",
      });
      return;
    }

    setCategories((prev) => ({
      ...prev,
      [type]: prev[type].filter((cat) => cat !== categoryToDelete),
    }));
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 animate-fadeIn">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center mb-8">Expense Tracker</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6 backdrop-blur-sm bg-white/50 animate-slideIn">
            <h2 className="text-2xl font-semibold mb-4">Add Transaction</h2>
            <TransactionForm onSubmit={addTransaction} categories={categories} />
          </Card>
          
          <Card className="p-6 backdrop-blur-sm bg-white/50 animate-slideIn">
            <h2 className="text-2xl font-semibold mb-4">Manage Categories</h2>
            <CategoryManager 
              categories={categories} 
              onAddCategory={addCategory}
              onUpdateCategory={updateCategory}
              onDeleteCategory={deleteCategory}
            />
          </Card>
        </div>

        <Card className="p-6 backdrop-blur-sm bg-white/50 animate-slideIn">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <CategoryChart transactions={transactions} timePeriod={timePeriod} dateRange={dateRange} />
        </Card>

        <Card className="p-6 backdrop-blur-sm bg-white/50 animate-slideIn">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-2xl font-semibold">Transactions</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <TimeSelector value={timePeriod} onChange={setTimePeriod} />
              <DateRangeSelector dateRange={dateRange} onDateRangeChange={setDateRange} />
            </div>
          </div>
          <TransactionList transactions={transactions} timePeriod={timePeriod} dateRange={dateRange} />
        </Card>
      </div>
    </div>
  );
};

export default Index;