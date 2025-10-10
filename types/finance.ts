// Core transaction types
export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  paymentMethod?: string;
}

// Weekly activity data
export interface WeeklyData {
  day: string;
  income: number;
  outcome: number;
}

// Payment method types
export interface PaymentMethod {
  id: string;
  type: 'mastercard' | 'visa' | 'amex' | 'discover';
  last4: string;
  balance: number;
  isDefault: boolean;
  expiryMonth: number;
  expiryYear: number;
  holderName?: string;
}

// Expense breakdown
export interface ExpenseData {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

// Savings goal
export interface SavingsGoal {
  id: string;
  title: string;
  current: number;
  target: number;
  percentage: number;
  deadline?: string;
}

// Summary statistics
export interface SummaryStats {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  balanceChange: number;
  incomeChange: number;
  expenseChange: number;
}

// Dashboard data structure
export interface DashboardData {
  summary: SummaryStats;
  weeklyActivity: WeeklyData[];
  recentTransactions: Transaction[];
  paymentMethods: PaymentMethod[];
  expenseBreakdown: ExpenseData[];
  savingsGoals: SavingsGoal[];
}

// Chart configuration types
export interface ChartColors {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
}

// Component props
export interface WeeklyActivityProps {
  data?: WeeklyData[];
  className?: string;
  height?: number;
}

export interface PaymentMethodCardProps {
  paymentMethod?: PaymentMethod;
  expenseData?: ExpenseData[];
  savingsGoal?: SavingsGoal;
  className?: string;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// User preferences
export interface UserPreferences {
  currency: string;
  dateFormat: string;
  theme: 'light' | 'dark';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

// Filter options
export interface TransactionFilters {
  dateRange?: {
    start: string;
    end: string;
  };
  categories?: string[];
  types?: ('income' | 'expense')[];
  amountRange?: {
    min: number;
    max: number;
  };
  paymentMethods?: string[];
}
