import React from 'react';

interface StatBarProps {
  label: string;
  value: number;
  total: number;
  color: string;
}

export default function StatBar({ label, value, total, color }: StatBarProps) {
  const percentage = (value / total) * 100;

  return (
    <div className="flex min-w-[300px] flex-col space-y-2 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600">{label}</span>
        <span className="text-lg font-bold text-gray-800">{value}</span>
      </div>
      <div className="h-4 overflow-hidden rounded-full bg-gray-100">
        <div
          className={`h-full ${color} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
