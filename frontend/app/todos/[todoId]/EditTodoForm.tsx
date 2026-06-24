"use client"; 

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Todo = { id: number; title: string; completed: boolean };

export default function EditTodoForm({ initialTodo }: { initialTodo: Todo }) {
  const [title, setTitle] = useState(initialTodo.title);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return alert("할 일을 입력해주세요.");

    setIsSaving(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${initialTodo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim() }),
      });

      if (response.ok) {
        router.push("/todos"); 
        router.refresh();      
      } else {
        alert("수정에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("오류가 발생했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoComplete="off"
        autoFocus
        className="w-full px-4 py-3 border-2 border-[#e2e8f0] rounded-lg text-sm outline-none focus:border-[#672be0] transition-colors duration-200"
      />
      <div className="flex gap-2.5">
        <Link
          href="/todos"
          className="flex-1 bg-gray-200 text-[#475569] text-center px-5 py-3 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors duration-200"
        >
          취소
        </Link>
        <button
          type="submit"
          disabled={isSaving}
          className="flex-1 bg-[#672be0] text-white px-5 py-3 rounded-lg text-sm font-semibold cursor-pointer hover:bg-[#521cb8] transition-colors duration-200 disabled:bg-[#a78bfa]"
        >
          {isSaving ? "저장 중..." : "수정 완료"}
        </button>
      </div>
    </form>
  );
}