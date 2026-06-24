"use client"; 

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import Link from "next/link"; 

export default function NewTodoPage() {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("할 일을 입력해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), completed: false }),
      });

      if (response.ok) {
        router.push("/todos");
        router.refresh(); 
      } else {
        alert("할 일 추가에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9fa] flex justify-center items-start pt-[100px] px-4 font-sans">
      <div className="bg-white w-full max-w-[450px] p-[30px] rounded-[16px] shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
        <h1 className="text-[#222222] text-2xl font-bold mb-6 text-center tracking-tight">
          새로운 할 일 추가
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="새로운 할일을 입력하세요"
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
              disabled={isLoading}
              className="flex-1 bg-[#672be0] text-white px-5 py-3 rounded-lg text-sm font-semibold cursor-pointer hover:bg-[#521cb8] transition-colors duration-200 disabled:bg-[#a78bfa]"
            >
              {isLoading ? "추가 중..." : "추가"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}