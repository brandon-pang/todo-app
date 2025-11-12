'use client';

import { useState, useEffect, useCallback } from 'react';
import { Todo, TodoStats, FilterType, SortType } from '@/types/todo';
import { loadTodos, saveTodos } from '@/lib/storage';
import { filterTodos, sortTodos, generateId, isOverdue } from '@/lib/utils';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('createdAt');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Load todos from localStorage on mount
  useEffect(() => {
    const loaded = loadTodos();
    setTodos(loaded);
    setIsLoading(false);
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      saveTodos(todos);
    }
  }, [todos, isLoading]);

  // Add new todo
  const addTodo = useCallback((todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTodo: Todo = {
      ...todo,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTodos(prev => [newTodo, ...prev]);
    return newTodo;
  }, []);

  // Update existing todo
  const updateTodo = useCallback((id: string, updates: Partial<Todo>) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
          : todo
      )
    );
  }, []);

  // Toggle todo completion
  const toggleTodo = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { 
              ...todo, 
              completed: !todo.completed,
              updatedAt: new Date().toISOString() 
            }
          : todo
      )
    );
  }, []);

  // Delete todo
  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  // Delete completed todos
  const deleteCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }, []);

  // Delete all todos
  const deleteAll = useCallback(() => {
    setTodos([]);
  }, []);

  // Duplicate todo
  const duplicateTodo = useCallback((id: string) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      const duplicated: Todo = {
        ...todo,
        id: generateId(),
        title: `${todo.title} (복사본)`,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setTodos(prev => [duplicated, ...prev]);
    }
  }, [todos]);

  // Get filtered and sorted todos
  const getFilteredTodos = useCallback(() => {
    const filtered = filterTodos(todos, filter, searchQuery, selectedCategory);
    return sortTodos(filtered, sortBy);
  }, [todos, filter, searchQuery, selectedCategory, sortBy]);

  // Calculate statistics
  const getStats = useCallback((): TodoStats => {
    const completed = todos.filter(t => t.completed).length;
    const active = todos.filter(t => !t.completed).length;
    const highPriority = todos.filter(t => t.priority === 'high' && !t.completed).length;
    const overdue = todos.filter(t => !t.completed && isOverdue(t.dueDate)).length;

    return {
      total: todos.length,
      completed,
      active,
      highPriority,
      overdue,
    };
  }, [todos]);

  // Get all categories
  const getCategories = useCallback((): string[] => {
    const categories = new Set(todos.map(t => t.category).filter(Boolean) as string[]);
    return Array.from(categories);
  }, [todos]);

  // Get all tags
  const getAllTags = useCallback((): string[] => {
    const tags = new Set(todos.flatMap(t => t.tags || []));
    return Array.from(tags);
  }, [todos]);

  return {
    todos: getFilteredTodos(),
    allTodos: todos,
    filter,
    setFilter,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    isLoading,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    deleteCompleted,
    deleteAll,
    duplicateTodo,
    stats: getStats(),
    categories: getCategories(),
    tags: getAllTags(),
  };
};
