import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Transaction, TransactionType } from "@/types/transaction";
import { useToast } from "@/components/ui/use-toast";

const categories = {
  income: ["Salary", "Freelance", "Investments", "Other"],
  expense: ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Other"],
};

const TransactionForm = ({ onSubmit }: { onSubmit: (transaction: Transaction) => void }) => {
  const { toast } = useToast();
  const [type, setType] = useState<TransactionType>("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [transactionDate, setTransactionDate] = useState(new Date().toISOString().slice(0, 16));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const transaction: Transaction = {
      id: Date.now().toString(),
      type,
      amount: parseFloat(amount),
      category,
      description,
      date: new Date(transactionDate),
    };

    onSubmit(transaction);
    setAmount("");
    setCategory("");
    setDescription("");
    setTransactionDate(new Date().toISOString().slice(0, 16));

    toast({
      title: "Success",
      description: "Transaction added successfully",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Select value={type} onValueChange={(value: TransactionType) => setType(value)}>
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent className="bg-popover border shadow-md">
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="transition-all duration-200 hover:ring-2 hover:ring-primary/20"
        />
      </div>

      <div className="space-y-2">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-popover border shadow-md">
            {categories[type].map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Input
          type="datetime-local"
          value={transactionDate}
          onChange={(e) => setTransactionDate(e.target.value)}
          className="transition-all duration-200 hover:ring-2 hover:ring-primary/20"
        />
      </div>

      <div className="space-y-2">
        <Input
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="transition-all duration-200 hover:ring-2 hover:ring-primary/20"
        />
      </div>

      <Button type="submit" className="w-full transition-all duration-200 hover:opacity-90">
        Add Transaction
      </Button>
    </form>
  );
};

export default TransactionForm;