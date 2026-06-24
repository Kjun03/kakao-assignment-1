"use client"; 

import { useState } from "react";
import TodoItem from "./TodoItem";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, setTodos] = useState(initialTodos);

  const handleToggle = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <ul className="flex flex-col gap-3 list-none">
      {todos.length === 0 && (
        <p className="text-[#94a3b8] text-center py-4">아직 등록된 할 일이 없어요!</p>
      )}
      
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}