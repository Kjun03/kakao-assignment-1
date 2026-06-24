import Link from "next/link";
import TodoList from "./components/TodoList"; 

export default async function TodosPage() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`, {
    cache: "no-store",
  });
  const todos = await response.json();

  return (
    <div className="min-h-screen bg-[#f9f9fa] flex justify-center items-start pt-[100px] px-4 font-sans">
      <div className="bg-white w-full max-w-[450px] p-[30px] rounded-[16px] shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
        <h1 className="text-[#222222] text-2xl font-bold mb-6 text-center tracking-tight">
          Minimal Todo
        </h1>

        <div className="mb-6">
          <Link
            href="/todos/new"
            className="block w-full py-3 bg-[#672be0] text-white text-center rounded-lg font-semibold hover:bg-[#521cb8] transition-colors"
          >
            + 새로운 할 일 추가하기
          </Link>
        </div>

        <TodoList initialTodos={todos} />
      </div>
    </div>
  );
}