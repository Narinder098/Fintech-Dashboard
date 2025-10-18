'use client';

import { useEffect, useState } from 'react';
import { ProtectedRoute } from '@/components/protected-route';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase, Transaction } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';

export default function ReportsPage() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadTransactions();
    }
  }, [user]);

  const loadTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user!.id)
        .order('date', { ascending: false });

      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      console.error('Error loading transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryData = () => {
    const categoryMap: { [key: string]: number } = {};

    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        const category = t.category;
        categoryMap[category] = (categoryMap[category] || 0) + Number(t.amount);
      });

    return Object.entries(categoryMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
  };

  const getMonthlyData = () => {
    const monthlyMap: { [key: string]: { income: number; expense: number } } = {};

    transactions.forEach((t) => {
      const month = new Date(t.date).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      });
      if (!monthlyMap[month]) {
        monthlyMap[month] = { income: 0, expense: 0 };
      }
      if (t.type === 'income') {
        monthlyMap[month].income += Number(t.amount);
      } else if (t.type === 'expense') {
        monthlyMap[month].expense += Number(t.amount);
      }
    });

    return Object.entries(monthlyMap).slice(0, 6);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const categoryData = getCategoryData();
  const monthlyData = getMonthlyData();

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Reports</h1>
            <p className="text-slate-600 mt-1">Analyze your financial data</p>
          </div>

          {loading ? (
            <div className="text-center py-8 text-slate-600">Loading...</div>
          ) : transactions.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-slate-600">
                No transactions yet. Add transactions to see reports!
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Top 5 Expense Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categoryData.map(([category, amount], index) => {
                      const total = categoryData.reduce((sum, [, amt]) => sum + amt, 0);
                      const percentage = (amount / total) * 100;
                      return (
                        <div key={category}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-slate-900">
                              {category}
                            </span>
                            <span className="text-sm font-bold text-slate-900">
                              {formatCurrency(amount)}
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div
                              className="bg-emerald-600 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <p className="text-xs text-slate-600 mt-1">
                            {percentage.toFixed(1)}% of total
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Income vs Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyData.map(([month, data]) => (
                      <div key={month}>
                        <p className="text-sm font-medium text-slate-900 mb-2">{month}</p>
                        <div className="space-y-2">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-green-600">Income</span>
                              <span className="text-xs font-bold text-green-600">
                                {formatCurrency(data.income)}
                              </span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-1.5">
                              <div
                                className="bg-green-600 h-1.5 rounded-full"
                                style={{
                                  width: `${Math.min(
                                    (data.income / Math.max(data.income, data.expense)) * 100,
                                    100
                                  )}%`,
                                }}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-red-600">Expenses</span>
                              <span className="text-xs font-bold text-red-600">
                                {formatCurrency(data.expense)}
                              </span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-1.5">
                              <div
                                className="bg-red-600 h-1.5 rounded-full"
                                style={{
                                  width: `${Math.min(
                                    (data.expense / Math.max(data.income, data.expense)) * 100,
                                    100
                                  )}%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Summary Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-6">
                    <div>
                      <p className="text-sm text-slate-600">Total Transactions</p>
                      <p className="text-2xl font-bold text-slate-900">
                        {transactions.length}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Total Income</p>
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(
                          transactions
                            .filter((t) => t.type === 'income')
                            .reduce((sum, t) => sum + Number(t.amount), 0)
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Total Expenses</p>
                      <p className="text-2xl font-bold text-red-600">
                        {formatCurrency(
                          transactions
                            .filter((t) => t.type === 'expense')
                            .reduce((sum, t) => sum + Number(t.amount), 0)
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Net Savings</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {formatCurrency(
                          transactions
                            .filter((t) => t.type === 'income')
                            .reduce((sum, t) => sum + Number(t.amount), 0) -
                            transactions
                              .filter((t) => t.type === 'expense')
                              .reduce((sum, t) => sum + Number(t.amount), 0)
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
