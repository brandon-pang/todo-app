export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
  category?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export type FilterType = 'all' | 'active' | 'completed';
export type SortType = 'createdAt' | 'dueDate' | 'priority';
export type PriorityType = 'high' | 'medium' | 'low';

export interface TodoStats {
  total: number;
  completed: number;
  active: number;
  highPriority: number;
  overdue: number;
}
