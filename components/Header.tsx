'use client';

import React from 'react';
import { CheckCircle2, Circle, AlertCircle, Clock } from 'lucide-react';
import { TodoStats } from '@/types/todo';

interface HeaderProps {
  stats: TodoStats;
}

const Header: React.FC<HeaderProps> = ({ stats }) => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">할 일 관리</h1>
              <p className="text-purple-100 text-sm mt-1">
                효율적으로 작업을 관리하세요
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            icon={<Circle className="w-5 h-5" />}
            label="전체"
            value={stats.total}
            color="bg-white/20"
          />
          <StatCard
            icon={<CheckCircle2 className="w-5 h-5" />}
            label="완료"
            value={stats.completed}
            color="bg-green-500/30"
          />
          <StatCard
            icon={<AlertCircle className="w-5 h-5" />}
            label="높은 우선순위"
            value={stats.highPriority}
            color="bg-red-500/30"
          />
          <StatCard
            icon={<Clock className="w-5 h-5" />}
            label="지연됨"
            value={stats.overdue}
            color="bg-orange-500/30"
          />
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color }) => {
  return (
    <div className={`${color} backdrop-blur-sm rounded-lg p-4 transition-all hover:scale-105`}>
      <div className="flex items-center gap-3">
        <div className="text-white/90">{icon}</div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-white/80">{label}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
