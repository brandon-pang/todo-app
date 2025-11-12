'use client';

import React from 'react';
import Header from '@/components/Header';
import TodoInput from '@/components/TodoInput';
import TodoFilters from '@/components/TodoFilters';
import TodoList from '@/components/TodoList';
import { useTodos } from '@/hooks/useTodos';
import { exportTodos, importTodos } from '@/lib/storage';

export default function Home() {
  const {
    todos,
    allTodos,
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
    duplicateTodo,
    stats,
    categories,
    tags,
  } = useTodos();

  const handleExport = () => {
    exportTodos(allTodos);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const importedTodos = await importTodos(file);
      // Add imported todos to existing ones
      importedTodos.forEach(todo => {
        addTodo(todo);
      });
      alert(`${importedTodos.length}개의 할 일을 가져왔습니다.`);
    } catch (error) {
      alert('파일을 가져오는데 실패했습니다. JSON 형식을 확인해주세요.');
    }
    e.target.value = '';
  };

  const handleDeleteCompleted = () => {
    if (window.confirm('완료된 모든 항목을 삭제하시겠습니까?')) {
      deleteCompleted();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header stats={stats} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TodoInput 
          onAdd={addTodo}
          categories={categories}
          existingTags={tags}
        />

        <TodoFilters
          filter={filter}
          setFilter={setFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onExport={handleExport}
          onImport={handleImport}
          onDeleteCompleted={handleDeleteCompleted}
          completedCount={stats.completed}
        />

        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onUpdate={updateTodo}
          onDuplicate={duplicateTodo}
          searchQuery={searchQuery}
        />

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© 2025 Todo App. Made with Next.js & TypeScript</p>
        </footer>
      </main>
    </div>
  );
}
