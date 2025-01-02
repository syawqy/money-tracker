import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TransactionType } from "@/types/transaction";
import { useToast } from "@/components/ui/use-toast";

interface CategoryManagerProps {
  categories: {
    income: string[];
    expense: string[];
  };
  onAddCategory: (type: TransactionType, category: string) => void;
}

const CategoryManager = ({ categories, onAddCategory }: CategoryManagerProps) => {
  const { toast } = useToast();
  const [newCategory, setNewCategory] = useState("");
  const [selectedType, setSelectedType] = useState<TransactionType>("expense");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCategory.trim()) {
      toast({
        title: "Error",
        description: "Please enter a category name",
        variant: "destructive",
      });
      return;
    }

    if (categories[selectedType].includes(newCategory.trim())) {
      toast({
        title: "Error",
        description: "This category already exists",
        variant: "destructive",
      });
      return;
    }

    onAddCategory(selectedType, newCategory.trim());
    setNewCategory("");
    
    toast({
      title: "Success",
      description: "Category added successfully",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Select value={selectedType} onValueChange={(value: TransactionType) => setSelectedType(value)}>
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
          placeholder="New category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="transition-all duration-200 hover:ring-2 hover:ring-primary/20"
        />
      </div>

      <Button type="submit" className="w-full transition-all duration-200 hover:opacity-90">
        Add Category
      </Button>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Current Categories:</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium mb-1">Income</h4>
            <ul className="text-sm space-y-1">
              {categories.income.map((cat) => (
                <li key={cat} className="text-muted-foreground">{cat}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-1">Expense</h4>
            <ul className="text-sm space-y-1">
              {categories.expense.map((cat) => (
                <li key={cat} className="text-muted-foreground">{cat}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CategoryManager;