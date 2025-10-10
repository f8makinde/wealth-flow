'use client';
//import { useAuth } from '@/hooks/useAuth';
import WeeklyActivity from '@/components/dashboard/WeeklyActivity';
import PaymentMethodCard from '@/components/dashboard/PaymentMethodCard';
import SummaryCards from '@/components/dashboard/SummaryCards';
import { WeeklyData, PaymentMethod, ExpenseData, SavingsGoal } from '@/types/finance';

const mockWeeklyData: WeeklyData[] = [
  { day: 'Sun', income: 320, outcome: 180 },
  { day: 'Mon', income: 450, outcome: 280 },
  { day: 'Tue', income: 620, outcome: 420 },
  { day: 'Wed', income: 800, outcome: 350 },
  { day: 'Thu', income: 550, outcome: 290 },
  { day: 'Fri', income: 480, outcome: 320 },
  { day: 'Sat', income: 380, outcome: 160 },
];

const mockPaymentMethod: PaymentMethod = {
  id: '1',
  type: 'mastercard',
  last4: '1234',
  balance: 3750,
  isDefault: true,
  expiryMonth: 12,
  expiryYear: 2028,
  holderName: 'John Doe'
};

const mockExpenseData: ExpenseData[] = [
  { category: 'Entertainment', amount: 825, percentage: 30, color: '#3b82f6' },
  { category: 'Bill Expense', amount: 412.5, percentage: 15, color: '#10b981' },
  { category: 'Investment', amount: 550, percentage: 20, color: '#8b5cf6' },
  { category: 'Others', amount: 962.5, percentage: 35, color: '#06b6d4' }
];

const mockSavingsGoal: SavingsGoal = {
  id: '1',
  title: 'Emergency Fund',
  current: 15000,
  target: 25000,
  percentage: 60,
  deadline: '2024-12-31'
};

export default function DashboardPage() {
  //const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Summary</h1>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
                <option>Last Month</option>
                <option>Last 3 Months</option>
                <option>Last 6 Months</option>
                <option>Last Year</option>
              </select>
            </div>
            <SummaryCards />
          </div>

 
          <WeeklyActivity data={mockWeeklyData} className="h-auto" />

          {/* Recent Transactions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                See All
              </button>
            </div>
            <div className="space-y-4">
              {mockTransactions.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <PaymentMethodCard
            paymentMethod={mockPaymentMethod}
            expenseData={mockExpenseData}
            savingsGoal={mockSavingsGoal}
          />
        </div>
      </div>
    </div>
  );
}

// Transaction Item Component
interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
}

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const isIncome = transaction.type === 'income';
  
  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isIncome ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
        }`}>
          {isIncome ? '↗' : '↙'}
        </div>
        <div>
          <p className="font-medium text-gray-900">{transaction.description}</p>
          <p className="text-sm text-gray-500">{transaction.category} • {transaction.date}</p>
        </div>
      </div>
      <div className={`font-semibold ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
        {isIncome ? '+' : '-'}${Math.abs(transaction.amount).toLocaleString()}
      </div>
    </div>
  );
};

// Mock transactions data
const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '1 Mar 2024',
    description: 'Netflix Subscription',
    category: 'Entertainment',
    amount: -15.99,
    type: 'expense'
  },
  {
    id: '2',
    date: '1 Mar 2024',
    description: 'Salary Payment',
    category: 'Income',
    amount: 3500,
    type: 'income'
  },
  {
    id: '3',
    date: '29 Feb 2024',
    description: 'Grocery Shopping',
    category: 'Food',
    amount: -127.45,
    type: 'expense'
  }
];
