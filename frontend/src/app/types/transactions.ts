export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: string;
  category: string;
  description: string;
  date: Date;
}

export interface TransactionForPost {
  userId: string;
  amount: number;
  type: string;
  category: string;
  description: string;
  date: Date;
}