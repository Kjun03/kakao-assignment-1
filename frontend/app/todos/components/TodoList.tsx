"use client"; 

import { useState } from "react";
import TodoItem from "./TodoItem";

type Todo = {
  id: number;
  title: string;
  completed: boolean; // 기준 이름: completed
};

export default function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, setTodos] = useState(initialTodos);

  // 1. id 타입을 number로 수정
  const handleToggle = async (id: number, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        // 2. 백엔드로 보내는 키값도 completed로 통일 (FastAPI 설정에 따라 다를 수 있음)
        body: JSON.stringify({ completed: !currentStatus }), 
      });

      if (response.ok) {
        setTodos(
          todos.map((todo) =>
            // 3. todo.isCompleted 대신 todo.completed 사용
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      } else {
        alert("상태 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error("상태 변경 중 에러 발생:", error);
    }
  };

  // 4. id 타입을 number로 수정
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTodos(todos.filter((todo) => todo.id !== id));
      } else {
        alert("삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("삭제 중 에러 발생:", error);
    }
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