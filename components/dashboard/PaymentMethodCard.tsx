'use client';

import React from 'react';

interface PaymentMethod {
  id: string;
  type: 'mastercard' | 'visa' | 'amex' | 'discover';
  last4: string;
  balance: number;
  isDefault: boolean;
}

interface ExpenseData {
  category: string;
  percentage: number;
  color: string;
}

interface SavingsGoal {
  current: number;
  target: number;
  percentage: number;
}

interface PaymentMethodCardProps {
  paymentMethod?: PaymentMethod;
  expenseData?: ExpenseData[];
  savingsGoal?: SavingsGoal;
  className?: string;
}

const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({
  paymentMethod = defaultPaymentMethod,
  expenseData = defaultExpenseData,
  savingsGoal = defaultSavingsGoal,
  className = ''
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Payment Method Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Add New
          </button>
        </div>

        {/* Credit Card */}
        <div className="relative">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start mb-8">
              <div className="space-y-1">
                <div className="text-xs font-medium opacity-80">Balance</div>
                <div className="text-2xl font-bold">
                  ${paymentMethod.balance.toLocaleString()}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {paymentMethod.type === 'mastercard' && <MastercardIcon />}
                {paymentMethod.type === 'visa' && <VisaIcon />}
                {paymentMethod.type === 'amex' && <AmexIcon />}
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <div className="text-xs opacity-80">Card Number</div>
                <div className="font-mono text-lg tracking-wider">
                  •••• •••• •••• {paymentMethod.last4}
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="text-xs opacity-80">Valid Thru</div>
                <div className="text-sm font-medium">12/28</div>
              </div>
            </div>
          </div>

          {/* Card Actions */}
          <div className="mt-4 flex gap-3">
            <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
              View Details
            </button>
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
              Add Money
            </button>
          </div>
        </div>
      </div>

      {/* Expense Statistics */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Expense Statistics</h3>
          <button className="text-gray-400 hover:text-gray-600">
            <DotsIcon />
          </button>
        </div>

        {/* Donut Chart */}
        <div className="relative flex items-center justify-center mb-6">
          <svg className="w-48 h-48 -rotate-90" viewBox="0 0 100 100">
            {expenseData.map((item, index) => {
              const previousPercentage = expenseData
                .slice(0, index)
                .reduce((sum, prev) => sum + prev.percentage, 0);
              
              const circumference = 2 * Math.PI * 40;
              const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
              const strokeDashoffset = -((previousPercentage / 100) * circumference);
              
              return (
                <circle
                  key={item.category}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth="8"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">$2,750</div>
              <div className="text-sm text-gray-500">Total</div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-3">
          {expenseData.map((item) => (
            <div key={item.category} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm font-medium text-gray-700">
                  {item.category}
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Annual Savings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Annual Savings</h3>
          <button className="text-gray-400 hover:text-gray-600">
            <DotsIcon />
          </button>
        </div>

        <div className="relative">
          <svg className="w-full h-32" viewBox="0 0 200 100">
            <defs>
              <linearGradient id="savingsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
            
            {/* Background circle */}
            <circle
              cx="100"
              cy="50"
              r="35"
              fill="transparent"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            
            {/* Progress circle */}
            <circle
              cx="100"
              cy="50"
              r="35"
              fill="transparent"
              stroke="url(#savingsGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(savingsGoal.percentage / 100) * (2 * Math.PI * 35)} ${2 * Math.PI * 35}`}
              strokeDashoffset={2 * Math.PI * 35 / 4}
              className="transition-all duration-500"
            />
          </svg>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">
                {savingsGoal.percentage}%
              </div>
              <div className="text-xs text-gray-500">Completed</div>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Current Savings</span>
            <span className="font-semibold">${savingsGoal.current.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Target Amount</span>
            <span className="font-semibold">${savingsGoal.target.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Remaining</span>
            <span className="font-semibold text-blue-600">
              ${(savingsGoal.target - savingsGoal.current).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Icons
const MastercardIcon = () => (
  <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
    <rect width="32" height="20" rx="4" fill="white"/>
    <circle cx="12" cy="10" r="6" fill="#EB001B"/>
    <circle cx="20" cy="10" r="6" fill="#F79E1B"/>
    <path d="M16 6.5C17.5 7.8 17.5 12.2 16 13.5C14.5 12.2 14.5 7.8 16 6.5Z" fill="#FF5F00"/>
  </svg>
);

const VisaIcon = () => (
  <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
    <rect width="32" height="20" rx="4" fill="white"/>
    <path d="M12.3 6.5H14.1L13.2 13.5H11.4L12.3 6.5Z" fill="#1A1F71"/>
    <path d="M18.8 6.7C18.4 6.5 17.7 6.3 16.9 6.3C15.1 6.3 13.8 7.3 13.8 8.7C13.8 9.7 14.7 10.3 15.4 10.7C16.1 11.1 16.4 11.4 16.4 11.8C16.4 12.4 15.6 12.7 14.9 12.7C14 12.7 13.5 12.5 13.1 12.3L12.9 12.2L12.7 13.4C13.1 13.6 13.8 13.8 14.5 13.8C16.5 13.8 17.7 12.8 17.7 11.3C17.7 10.6 17.3 10 16.4 9.6C15.8 9.3 15.4 9 15.4 8.6C15.4 8.2 15.9 7.8 16.9 7.8C17.6 7.8 18.1 8 18.5 8.2L18.7 8.3L18.8 6.7Z" fill="#1A1F71"/>
  </svg>
);

const AmexIcon = () => (
  <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
    <rect width="32" height="20" rx="4" fill="#006FCF"/>
    <rect x="2" y="2" width="28" height="16" rx="2" fill="white"/>
    <text x="16" y="12" textAnchor="middle" className="text-xs font-bold fill-blue-600">AMEX</text>
  </svg>
);

const DotsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <circle cx="10" cy="4" r="1.5"/>
    <circle cx="10" cy="10" r="1.5"/>
    <circle cx="10" cy="16" r="1.5"/>
  </svg>
);

// Default data
const defaultPaymentMethod: PaymentMethod = {
  id: '1',
  type: 'mastercard',
  last4: '1234',
  balance: 3750,
  isDefault: true
};

const defaultExpenseData: ExpenseData[] = [
  { category: 'Entertainment', percentage: 30, color: '#3b82f6' },
  { category: 'Bill Expense', percentage: 15, color: '#10b981' },
  { category: 'Investment', percentage: 20, color: '#8b5cf6' },
  { category: 'Others', percentage: 35, color: '#06b6d4' }
];

const defaultSavingsGoal: SavingsGoal = {
  current: 15000,
  target: 25000,
  percentage: 60
};

export default PaymentMethodCard;
export type { PaymentMethod, ExpenseData, SavingsGoal, PaymentMethodCardProps };