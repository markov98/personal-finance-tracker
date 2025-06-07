export interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  type: string;
  category: string;
  description: string;
  date: Date;
}