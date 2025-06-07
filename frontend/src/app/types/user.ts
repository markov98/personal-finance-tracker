export interface User {
    username: string;
    email: string;
    password: string;
    id: string;
    balance: number
}

export interface UserForAuth {
  username: string;
  email: string;
  password: string;
  _id: string;
  accessToken: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  type: string;
  category: string;
  description: string;
  date: Date;
}