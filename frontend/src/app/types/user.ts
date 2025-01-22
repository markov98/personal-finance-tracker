
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
  id: string;
}