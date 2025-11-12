'use client';

import React from 'react';
import { Search, SlidersHorizontal, Download, Upload, Trash2 } from 'lucide-react';
import { FilterType, SortType } from '@/types/todo';

interface TodoFiltersProps {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  sortBy: SortType;
  setSortBy: (sort: SortType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteCompleted: () => void;
  completedCount: number;
}

const TodoFilters: React.FC<TodoFiltersProps> = ({
  filter,
  setFilter,
  sortBy,
  setSortBy,
  searchQuery,
  setSearchQuery,
  categories,
  selectedCategory,
  setSelectedCategory,
  onExport,
  onImport,
  onDeleteCompleted,
  completedCount,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="할 일, 설명, 태그 검색..."
          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-gray-800 placeholder-gray-400"
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <div className="flex gap-2">
          {(['all', 'active', 'completed'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === f
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {f === 'all' ? '전체' : f === 'active' ? '진행중' : '완료됨'}
            </button>
          ))}
        </div>
      </div>

      {/* Sort and Category */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-gray-600" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortType)}
            className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all cursor-pointer text-gray-800 bg-white"
          >
            <option value="createdAt">생성일순</option>
            <option value="dueDate">마감일순</option>
            <option value="priority">우선순위순</option>
          </select>
        </div>

        {categories.length > 0 && (
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all cursor-pointer text-gray-800 bg-white"
          >
            <option value="all">모든 카테고리</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
        <button
          onClick={onExport}
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
        >
          <Download className="w-4 h-4" />
          내보내기
        </button>

        <label className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium cursor-pointer">
          <Upload className="w-4 h-4" />
          가져오기
          <input
            type="file"
            accept=".json"
            onChange={onImport}
            className="hidden"
          />
        </label>

        {completedCount > 0 && (
          <button
            onClick={onDeleteCompleted}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium ml-auto"
          >
            <Trash2 className="w-4 h-4" />
            완료된 항목 삭제 ({completedCount})
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoFilters;
