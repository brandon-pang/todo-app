import { Todo, PriorityType } from '@/types/todo';

export const getPriorityColor = (priority: PriorityType): string => {
  switch (priority) {
    case 'high':
      return 'bg-red-500';
    case 'medium':
      return 'bg-yellow-500';
    case 'low':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
};

export const getPriorityTextColor = (priority: PriorityType): string => {
  switch (priority) {
    case 'high':
      return 'text-red-500';
    case 'medium':
      return 'text-yellow-500';
    case 'low':
      return 'text-green-500';
    default:
      return 'text-gray-500';
  }
};

export const getPriorityLabel = (priority: PriorityType): string => {
  switch (priority) {
    case 'high':
      return '높음';
    case 'medium':
      return '보통';
    case 'low':
      return '낮음';
    default:
      return '';
  }
};

export const isOverdue = (dueDate?: string): boolean => {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date();
};

export const isDueSoon = (dueDate?: string, days: number = 3): boolean => {
  if (!dueDate) return false;
  const due = new Date(dueDate);
  const soon = new Date();
  soon.setDate(soon.getDate() + days);
  return due <= soon && due >= new Date();
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  if (date.toDateString() === today.toDateString()) {
    return '오늘';
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return '내일';
  }
  
  return date.toLocaleDateString('ko-KR', { 
    month: 'long', 
    day: 'numeric' 
  });
};

export const filterTodos = (
  todos: Todo[],
  filter: 'all' | 'active' | 'completed',
  searchQuery: string,
  category?: string
): Todo[] => {
  let filtered = todos;

  // 완료 상태 필터
  if (filter === 'active') {
    filtered = filtered.filter(t => !t.completed);
  } else if (filter === 'completed') {
    filtered = filtered.filter(t => t.completed);
  }

  // 검색 필터
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(t =>
      t.title.toLowerCase().includes(query) ||
      t.description?.toLowerCase().includes(query) ||
      t.tags?.some(tag => tag.toLowerCase().includes(query))
    );
  }

  // 카테고리 필터
  if (category && category !== 'all') {
    filtered = filtered.filter(t => t.category === category);
  }

  return filtered;
};

export const sortTodos = (
  todos: Todo[],
  sortBy: 'createdAt' | 'dueDate' | 'priority'
): Todo[] => {
  return [...todos].sort((a, b) => {
    if (sortBy === 'createdAt') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === 'dueDate') {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    } else {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
  });
};

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
