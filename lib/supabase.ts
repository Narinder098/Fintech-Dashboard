import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  name: string;
  currency: string;
  timezone: string;
  premium: boolean;
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
};

export type Account = {
  id: string;
  user_id: string;
  name: string;
  type: 'bank' | 'wallet' | 'card' | 'investment' | 'cash';
  balance: number;
  currency: string;
  created_at: string;
  updated_at: string;
};

export type Transaction = {
  id: string;
  user_id: string;
  account_id: string | null;
  type: 'income' | 'expense' | 'transfer';
  amount: number;
  currency: string;
  category: string;
  note: string;
  date: string;
  created_at: string;
  updated_at: string;
};

export type Budget = {
  id: string;
  user_id: string;
  category: string;
  amount: number;
  period: 'monthly' | 'weekly' | 'yearly';
  created_at: string;
  updated_at: string;
};

export type Holding = {
  id: string;
  user_id: string;
  symbol: string;
  name: string;
  quantity: number;
  average_price: number;
  currency: string;
  type: 'stock' | 'crypto' | 'etf';
  created_at: string;
  updated_at: string;
};
