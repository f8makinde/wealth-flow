'use client';
import { useState } from 'react';
import { Plus, Edit2, Trash2, TrendingUp, AlertCircle, CheckCircle, PieChart as PieChartIcon } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';

interface Budget {
  id: string;
  category: string;
  allocated: number;
  spent: number;
  color: string;
  icon: string;
}

interface BudgetFormData {
  category: string;
  allocated: string;
  color: string;
  icon: string;
}

export default function BudgetingPage() {
  const [budgets, setBudgets] = useState<Budget[]>([
    { id: '1', category: 'Food & Dining', allocated: 800, spent: 620, color: '#10b981', icon: '🍔' },
    { id: '2', category: 'Transportation', allocated: 400, spent: 280, color: '#3b82f6', icon: '🚗' },
    { id: '3', category: 'Entertainment', allocated: 300, spent: 340, color: '#8b5cf6', icon: '🎮' },
    { id: '4', category: 'Shopping', allocated: 500, spent: 380, color: '#f59e0b', icon: '🛍️' },
    { id: '5', category: 'Bills & Utilities', allocated: 600, spent: 550, color: '#ef4444', icon: '💡' },
    { id: '6', category: 'Healthcare', allocated: 250, spent: 180, color: '#06b6d4', icon: '🏥' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const [formData, setFormData] = useState<BudgetFormData>({
    category: '',
    allocated: '',
    color: '#3b82f6',
    icon: '💰'
  });

  const categoryIcons = ['🍔', '🚗', '🎮', '🛍️', '💡', '🏥', '✈️', '📚', '💰', '🏠', '🎬', '☕'];
  const categoryColors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899', '#14b8a6'];

  const totalAllocated = budgets.reduce((sum, b) => sum + b.allocated, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const remaining = totalAllocated - totalSpent;

  const handleAddBudget = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category || !formData.allocated) {
      toast.warning('Please fill in all fields');
      return;
    }

    const newBudget: Budget = {
      id: `B${Date.now()}`,
      category: formData.category,
      allocated: parseFloat(formData.allocated),
      spent: 0,
      color: formData.color,
      icon: formData.icon
    };

    setBudgets([...budgets, newBudget]);
    setShowAddModal(false);
    toast.success('Budget created successfully!');
    
    setFormData({
      category: '',
      allocated: '',
      color: '#3b82f6',
      icon: '💰'
    });
  };

  const handleUpdateBudget = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingBudget) return;

    const updatedBudgets = budgets.map(b => 
      b.id === editingBudget.id 
        ? { ...b, category: formData.category, allocated: parseFloat(formData.allocated), color: formData.color, icon: formData.icon }
        : b
    );

    setBudgets(updatedBudgets);
    setEditingBudget(null);
    toast.success('Budget updated successfully!');
    
    setFormData({
      category: '',
      allocated: '',
      color: '#3b82f6',
      icon: '💰'
    });
  };

  const handleDeleteBudget = (id: string) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      setBudgets(budgets.filter(b => b.id !== id));
      toast.info('Budget deleted');
    }
  };

  const handleEditClick = (budget: Budget) => {
    setEditingBudget(budget);
    setFormData({
      category: budget.category,
      allocated: budget.allocated.toString(),
      color: budget.color,
      icon: budget.icon
    });
  };

  const getStatus = (spent: number, allocated: number) => {
    const percentage = (spent / allocated) * 100;
    if (percentage >= 100) return 'over';
    if (percentage >= 80) return 'warning';
    return 'good';
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 px-2 sm:px-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">Budget Planning</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage your monthly budgets and track spending
          </p>
        </div>
        
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#225BA4] text-white rounded-lg hover:bg-[#225BA4]/90 transition-colors text-sm font-medium whitespace-nowrap w-full sm:w-auto justify-center"
        >
          <Plus className="w-4 h-4" />
          Create Budget
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-0">
        {/* Total Allocated */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <PieChartIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-medium text-gray-600">Total Budget</h3>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">
              ${totalAllocated.toLocaleString()}
            </div>
            <p className="text-xs sm:text-sm text-gray-500">Allocated for {budgets.length} categories</p>
          </div>
        </div>

        {/* Total Spent */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-medium text-gray-600">Total Spent</h3>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">
              ${totalSpent.toLocaleString()}
            </div>
            <p className="text-xs sm:text-sm text-gray-500">
              {((totalSpent / totalAllocated) * 100).toFixed(1)}% of budget used
            </p>
          </div>
        </div>

        {/* Remaining */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center ${
                remaining >= 0 ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {remaining >= 0 ? (
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                )}
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-medium text-gray-600">Remaining</h3>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <div className={`text-2xl sm:text-3xl font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${Math.abs(remaining).toLocaleString()}
            </div>
            <p className="text-xs sm:text-sm text-gray-500">
              {remaining >= 0 ? 'Under budget' : 'Over budget'}
            </p>
          </div>
        </div>
      </div>

      {/* Budget Cards */}
      <div className="px-2 sm:px-0">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Budget Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {budgets.map((budget) => {
            const percentage = (budget.spent / budget.allocated) * 100;
            const status = getStatus(budget.spent, budget.allocated);
            
            return (
              <div key={budget.id} className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                      style={{ backgroundColor: `${budget.color}20` }}
                    >
                      {budget.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{budget.category}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        ${budget.spent.toLocaleString()} / ${budget.allocated.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEditClick(budget)}
                      className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteBudget(budget.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className={`font-medium ${
                      status === 'over' ? 'text-red-600' :
                      status === 'warning' ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {percentage.toFixed(0)}%
                    </span>
                    <span className="text-gray-500 text-xs">
                      ${(budget.allocated - budget.spent).toLocaleString()} left
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        status === 'over' ? 'bg-red-500' :
                        status === 'warning' ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ 
                        width: `${Math.min(percentage, 100)}%`,
                        backgroundColor: status === 'good' ? budget.color : undefined
                      }}
                    ></div>
                  </div>

                  {status === 'over' && (
                    <div className="flex items-center gap-1 text-red-600 text-xs mt-2">
                      <AlertCircle className="w-3 h-3" />
                      <span>Over budget by ${(budget.spent - budget.allocated).toLocaleString()}</span>
                    </div>
                  )}
                  
                  {status === 'warning' && (
                    <div className="flex items-center gap-1 text-yellow-600 text-xs mt-2">
                      <AlertCircle className="w-3 h-3" />
                      <span>Approaching limit</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add/Edit Budget Modal */}
      {(showAddModal || editingBudget) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                {editingBudget ? 'Edit Budget' : 'Create New Budget'}
              </h2>
              <button 
                onClick={() => {
                  setShowAddModal(false);
                  setEditingBudget(null);
                  setFormData({ category: '', allocated: '', color: '#3b82f6', icon: '💰' });
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>

            <form onSubmit={editingBudget ? handleUpdateBudget : handleAddBudget} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Food & Dining"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.allocated}
                    onChange={(e) => setFormData({...formData, allocated: e.target.value})}
                    className="w-full pl-8 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose Icon
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {categoryIcons.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setFormData({...formData, icon})}
                      className={`w-full aspect-square flex items-center justify-center text-2xl rounded-lg border-2 transition-all ${
                        formData.icon === icon
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose Color
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {categoryColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setFormData({...formData, color})}
                      className={`w-full aspect-square rounded-lg border-2 transition-all ${
                        formData.color === color
                          ? 'border-gray-900 scale-110'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingBudget(null);
                    setFormData({ category: '', allocated: '', color: '#3b82f6', icon: '💰' });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#225BA4] text-white rounded-lg hover:bg-[#225BA4]/90 text-sm font-medium transition-colors"
                >
                  {editingBudget ? 'Update Budget' : 'Create Budget'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        className="mt-16 sm:mt-4"
      />
    </div>
  );
}