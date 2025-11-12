'use client';

import React, { useState } from 'react';
import { Plus, Tag, Calendar, AlertCircle } from 'lucide-react';
import { Todo, PriorityType } from '@/types/todo';

interface TodoInputProps {
  onAdd: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => void;
  categories: string[];
  existingTags: string[];
}

const TodoInput: React.FC<TodoInputProps> = ({ onAdd, categories, existingTags }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<PriorityType>('medium');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      description: description.trim() || undefined,
      completed: false,
      priority,
      dueDate: dueDate || undefined,
      category: category || undefined,
      tags: tags.length > 0 ? tags : undefined,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    setCategory('');
    setTags([]);
    setNewTag('');
    setShowAdvanced(false);
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6 animate-slide-down">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">새로운 할 일</h2>
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm text-purple-600 hover:text-purple-700 font-medium"
        >
          {showAdvanced ? '간단히 보기' : '고급 옵션'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="할 일을 입력하세요..."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-gray-800 placeholder-gray-400"
            maxLength={100}
          />
        </div>

        {showAdvanced && (
          <>
            <div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="설명 (선택사항)"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all resize-none text-gray-800 placeholder-gray-400"
                rows={3}
                maxLength={500}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  마감일
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  카테고리
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="카테고리 입력"
                    list="categories"
                    className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-gray-800 placeholder-gray-400"
                    maxLength={30}
                  />
                  <datalist id="categories">
                    {categories.map(cat => (
                      <option key={cat} value={cat} />
                    ))}
                  </datalist>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Tag className="w-4 h-4 inline mr-1" />
                태그
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="태그 추가..."
                  list="existing-tags"
                  className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-gray-800 placeholder-gray-400"
                  maxLength={20}
                />
                <datalist id="existing-tags">
                  {existingTags.map(tag => (
                    <option key={tag} value={tag} />
                  ))}
                </datalist>
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  추가
                </button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-purple-900"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <AlertCircle className="w-4 h-4 inline mr-1" />
              우선순위
            </label>
            <div className="flex gap-2">
              {(['low', 'medium', 'high'] as PriorityType[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                    priority === p
                      ? p === 'high'
                        ? 'bg-red-500 text-white'
                        : p === 'medium'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {p === 'high' ? '높음' : p === 'medium' ? '보통' : '낮음'}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!title.trim()}
            className="mt-7 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center gap-2 font-medium shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            추가
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoInput;
