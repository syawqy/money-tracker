import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TransactionType } from "@/types/transaction";
import { useToast } from "@/components/ui/use-toast";
import { Pencil, Trash2, X, Check } from "lucide-react";

interface CategoryManagerProps {
  categories: {
    income: string[];
    expense: string[];
  };
  onAddCategory: (type: TransactionType, category: string) => void;
  onUpdateCategory: (type: TransactionType, oldCategory: string, newCategory: string) => void;
  onDeleteCategory: (type: TransactionType, category: string) => void;
}

const CategoryManager = ({ categories, onAddCategory, onUpdateCategory, onDeleteCategory }: CategoryManagerProps) => {
  const { toast } = useToast();
  const [newCategory, setNewCategory] = useState("");
  const [selectedType, setSelectedType] = useState<TransactionType>("expense");
  const [editingCategory, setEditingCategory] = useState<{ type: TransactionType; category: string; newName: string } | null>(null);

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

  const startEditing = (type: TransactionType, category: string) => {
    setEditingCategory({ type, category, newName: category });
  };

  const cancelEditing = () => {
    setEditingCategory(null);
  };

  const handleUpdate = () => {
    if (!editingCategory) return;

    const { type, category, newName } = editingCategory;
    
    if (!newName.trim()) {
      toast({
        title: "Error",
        description: "Category name cannot be empty",
        variant: "destructive",
      });
      return;
    }

    if (categories[type].includes(newName.trim()) && newName.trim() !== category) {
      toast({
        title: "Error",
        description: "This category already exists",
        variant: "destructive",
      });
      return;
    }

    onUpdateCategory(type, category, newName.trim());
    setEditingCategory(null);
    
    toast({
      title: "Success",
      description: "Category updated successfully",
    });
  };

  const handleDelete = (type: TransactionType, category: string) => {
    onDeleteCategory(type, category);
    toast({
      title: "Success",
      description: "Category deleted successfully",
    });
  };

  const renderCategoryList = (type: TransactionType) => (
    <div>
      <h4 className="text-sm font-medium mb-1">{type === "income" ? "Income" : "Expense"}</h4>
      <ul className="text-sm space-y-2">
        {categories[type].map((cat) => (
          <li key={cat} className="flex items-center justify-between group">
            {editingCategory?.type === type && editingCategory?.category === cat ? (
              <div className="flex items-center gap-2">
                <Input
                  value={editingCategory.newName}
                  onChange={(e) => setEditingCategory({ ...editingCategory, newName: e.target.value })}
                  className="h-7 w-[120px]"
                />
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleUpdate}>
                  <Check className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={cancelEditing}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                <span className="text-muted-foreground">{cat}</span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => startEditing(type, cat)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleDelete(type, cat)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

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
          {renderCategoryList("income")}
          {renderCategoryList("expense")}
        </div>
      </div>
    </form>
  );
};

export default CategoryManager;