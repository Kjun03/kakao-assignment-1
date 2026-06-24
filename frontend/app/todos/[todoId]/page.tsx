import EditTodoForm from "./EditTodoForm";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default async function EditTodoPage({ params }: { params: Promise<{ todoId: string }> }) {
  
  const response = await fetch("http://localhost:8000/todos", {
    cache: "no-store",
  });
  const todos = await response.json();

  const resolvedParams = await params;
  const initialTodo = todos.find((todo: Todo) => todo.id === Number(resolvedParams.todoId));

  if (!initialTodo) {
    return <div className="text-center mt-[100px] text-[#94a3b8] font-semibold">해당 할 일을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="min-h-screen bg-[#f9f9fa] flex justify-center items-start pt-[100px] px-4 font-sans">
      <div className="bg-white w-full max-w-[450px] p-[30px] rounded-[16px] shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
        <h1 className="text-[#222222] text-2xl font-bold mb-6 text-center tracking-tight">
          할 일 수정
        </h1>
        <EditTodoForm initialTodo={initialTodo} />
      </div>
    </div>
  );
}