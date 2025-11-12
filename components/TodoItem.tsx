'use client';

import React, { useState } from 'react';
import { 
  Trash2, 
  Edit2, 
  Save, 
  X, 
  Calendar, 
  Tag, 
  Copy, 
  AlertCircle,
  Clock
} from 'lucide-react';
import { Todo, PriorityType } from '@/types/todo';
import { getPriorityColor, getPriorityLabel, formatDate, isOverdue, isDueSoon } from '@/lib/utils';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onDuplicate: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ 
  todo, 
  onToggle, 
  onDelete, 
  onUpdate,
  onDuplicate 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');
  const [editPriority, setEditPriority] = useState(todo.priority);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || '');

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(todo.id, {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined,
        priority: editPriority,
        dueDate: editDueDate || undefined,
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setEditPriority(todo.priority);
    setEditDueDate(todo.dueDate || '');
    setIsEditing(false);
  };

  const overdue = isOverdue(todo.dueDate);
  const dueSoon = isDueSoon(todo.dueDate);

  return (
    <div 
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-4 border-l-4 animate-slide-up ${
        todo.completed ? 'opacity-60' : ''
      } ${getPriorityColor(todo.priority).replace('bg-', 'border-')}`}
    >
      {isEditing ? (
        // Edit Mode
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none text-gray-800"
            autoFocus
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="설명 추가..."
            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none resize-none text-gray-800 placeholder-gray-400"
            rows={2}
          />
          <div className="flex gap-2 flex-wrap">
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value as PriorityType)}
              className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none text-gray-800"
            >
              <option value="low">낮음</option>
              <option value="medium">보통</option>
              <option value="high">높음</option>
            </select>
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none text-gray-800"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              취소
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              저장
            </button>
          </div>
        </div>
      ) : (
        // View Mode
        <div className="flex gap-3">
          {/* Checkbox */}
          <div className="flex-shrink-0 pt-1">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 
                className={`text-lg font-semibold ${
                  todo.completed 
                    ? 'line-through text-gray-500' 
                    : 'text-gray-800'
                }`}
              >
                {todo.title}
              </h3>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getPriorityColor(todo.priority)}`}>
                  {getPriorityLabel(todo.priority)}
                </span>
              </div>
            </div>

            {todo.description && (
              <p className="text-gray-600 text-sm mb-2 whitespace-pre-wrap">
                {todo.description}
              </p>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-3">
              {todo.dueDate && (
                <div className={`flex items-center gap-1 ${
                  overdue ? 'text-red-600 font-semibold' : 
                  dueSoon ? 'text-orange-600 font-semibold' : ''
                }`}>
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(todo.dueDate)}</span>
                  {overdue && <AlertCircle className="w-4 h-4" />}
                </div>
              )}
              {todo.category && (
                <div className="flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  <span>{todo.category}</span>
                </div>
              )}
              <div className="flex items-center gap-1 text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{new Date(todo.createdAt).toLocaleDateString('ko-KR')}</span>
              </div>
            </div>

            {/* Tags */}
            {todo.tags && todo.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {todo.tags.map(tag => (
                  <span 
                    key={tag}
                    className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm flex items-center gap-1 font-medium"
              >
                <Edit2 className="w-3.5 h-3.5" />
                수정
              </button>
              <button
                onClick={() => onDuplicate(todo.id)}
                className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors text-sm flex items-center gap-1 font-medium"
              >
                <Copy className="w-3.5 h-3.5" />
                복사
              </button>
              <button
                onClick={() => {
                  if (window.confirm('정말로 삭제하시겠습니까?')) {
                    onDelete(todo.id);
                  }
                }}
                className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm flex items-center gap-1 font-medium ml-auto"
              >
                <Trash2 className="w-3.5 h-3.5" />
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
