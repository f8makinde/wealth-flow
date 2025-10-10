'use client';
import { useState, useMemo } from 'react';

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
  paymentMethod: string;
  status: 'completed' | 'pending' | 'cancelled';
}

export function useFinancialData() {
  const [transactions] = useState<Transaction[]>([
    { id: '1', type: 'income', amount: 3500, category: 'Salary', date: '2025-01-15', description: 'Monthly Salary', paymentMethod: 'Bank Transfer', status: 'completed' },
    { id: '2', type: 'expense', amount: 1200, category: 'Rent', date: '2025-01-01', description: 'Monthly Rent', paymentMethod: 'Bank Transfer', status: 'completed' },
    { id: '3', type: 'expense', amount: 350, category: 'Food', date: '2025-01-05', description: 'Grocery Shopping', paymentMethod: 'Card', status: 'completed' },
    { id: '4', type: 'expense', amount: 80, category: 'Entertainment', date: '2025-01-10', description: 'Netflix Subscription', paymentMethod: 'Card', status: 'completed' },
    { id: '5', type: 'income', amount: 700, category: 'Freelance', date: '2025-01-12', description: 'Web Design Project', paymentMethod: 'Bank Transfer', status: 'completed' },
    { id: '6', type: 'expense', amount: 60, category: 'Utilities', date: '2025-01-08', description: 'Electricity Bill', paymentMethod: 'Card', status: 'completed' },
    { id: '7', type: 'expense', amount: 120, category: 'Investment', date: '2025-01-14', description: 'Stock Purchase', paymentMethod: 'Bank Transfer', status: 'completed' },
  ]);

  const financialSummary = useMemo(() => {
    const currentMonth = transactions.filter(t => 
      t.date.startsWith('2025-01') && t.status === 'completed'
    );

    const totalIncome = currentMonth
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = currentMonth
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalBalance = 12350.75; 
    
    const previousIncome = 3800;
    const previousExpenses = 2950;
    
    const incomeChange = ((totalIncome - previousIncome) / previousIncome) * 100;
    const expenseChange = ((totalExpenses - previousExpenses) / previousExpenses) * 100;

    return {
      totalBalance,
      totalIncome,
      totalExpenses,
      incomeChange: Math.round(incomeChange),
      expenseChange: Math.round(expenseChange)
    };
  }, [transactions]);

  return {
    transactions,
    financialSummary
  };
}