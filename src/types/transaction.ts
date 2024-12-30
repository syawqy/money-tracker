export type TransactionType = "income" | "expense";
export type TimePeriod = "daily" | "weekly" | "monthly" | "yearly";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  description: string;
  date: Date;
}