'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import TodoItem from './TodoItem';
import { Todo } from '@/types/todo';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onDuplicate: (id: string) => void;
  searchQuery: string;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
  onUpdate,
  onDuplicate,
  searchQuery,
}) => {
  if (todos.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-12 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-gray-100 p-6 rounded-full">
            <CheckCircle2 className="w-16 h-16 text-gray-400" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          {searchQuery ? '검색 결과가 없습니다' : '할 일이 없습니다'}
        </h3>
        <p className="text-gray-500">
          {searchQuery 
            ? '다른 검색어로 다시 시도해보세요' 
            : '새로운 할 일을 추가해서 시작하세요!'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onDuplicate={onDuplicate}
        />
      ))}
    </div>
  );
};

export default TodoList;
