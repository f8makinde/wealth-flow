'use client';

import React, { useRef, useEffect } from 'react';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

interface WeeklyData {
  day: string;
  income: number;
  outcome: number;
}

interface WeeklyActivityProps {
  data?: WeeklyData[];
  className?: string;
}

const WeeklyActivity: React.FC<WeeklyActivityProps> = ({ 
  data = defaultWeeklyData, 
  className = '' 
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: data.map(item => item.day),
        datasets: [
          {
            label: 'Income',
            data: data.map(item => item.income),
            backgroundColor: '#3b82f6',
            borderRadius: 4,
            borderSkipped: false,
          },
          {
            label: 'Outcome',
            data: data.map(item => item.outcome),
            backgroundColor: '#e2e8f0',
            borderRadius: 4,
            borderSkipped: false,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false, // We'll use custom legend
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            cornerRadius: 8,
            displayColors: true,
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
            ticks: {
              color: '#64748b',
              font: {
                size: 12,
                weight: 500
              }
            }
          },
          y: {
            grid: {
              color: '#f1f5f9',
              display: false,
            },
            border: {
              display: false,
            },
            ticks: {
              color: '#64748b',
              font: {
                size: 12,
              },
              callback: function(value) {
                return '$' + (value as number).toLocaleString();
              }
            },
            beginAtZero: true,
          }
        },
        elements: {
          bar: {
            borderWidth: 0,
          }
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
        animation: {
          duration: 800,
          easing: 'easeInOutQuart',
        },
      }
    };

    chartInstance.current = new Chart(ctx, config);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Weekly Activity</h3>
        
        {/* Custom Legend */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-600">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <span className="text-sm font-medium text-gray-600">Outcome</span>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative h-64">
        <canvas ref={chartRef} className="w-full h-full"></canvas>
      </div>

      {/* Summary Stats */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <div className="text-center">
          <div className="text-sm text-gray-500">Total Income</div>
          <div className="text-lg font-semibold text-green-600">
            ${data.reduce((sum, item) => sum + item.income, 0).toLocaleString()}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500">Total Outcome</div>
          <div className="text-lg font-semibold text-gray-600">
            ${data.reduce((sum, item) => sum + item.outcome, 0).toLocaleString()}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500">Net</div>
          <div className={`text-lg font-semibold ${
            data.reduce((sum, item) => sum + (item.income - item.outcome), 0) >= 0 
              ? 'text-green-600' 
              : 'text-red-600'
          }`}>
            ${data.reduce((sum, item) => sum + (item.income - item.outcome), 0).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

// Default data for demonstration
const defaultWeeklyData: WeeklyData[] = [
  { day: 'Sun', income: 300, outcome: 200 },
  { day: 'Mon', income: 450, outcome: 300 },
  { day: 'Tue', income: 600, outcome: 400 },
  { day: 'Wed', income: 800, outcome: 350 },
  { day: 'Thu', income: 550, outcome: 250 },
  { day: 'Fri', income: 400, outcome: 300 },
  { day: 'Sat', income: 350, outcome: 150 },
];

export default WeeklyActivity;
export type { WeeklyData, WeeklyActivityProps };