export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  return (
    <li
      className={`flex justify-between items-center p-3.5 px-4 bg-white border rounded-lg transition-all duration-200 ${
        todo.completed ? "bg-[#f8fafc] border-[#e2e8f0]" : "border-[#edf2f7]"
      }`}
    >
      <span
        className={`text-[15px] break-all flex-1 mr-3 transition-all duration-200 ${
          todo.completed ? "line-through text-[#94a3b8]" : "text-[#334155]"
        }`}
      >
        {todo.text}
      </span>
      <div className="flex gap-1.5">
        <button
          onClick={() => onToggle(todo.id)}
          className={`px-2.5 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-all duration-200 ${
            todo.completed
              ? "bg-[#672be0] text-white"
              : "bg-[#f1f5f9] text-[#672be0] hover:bg-[#672be0] hover:text-white"
          }`}
        >
          {todo.completed ? "취소" : "완료"}
        </button>
        <button
          onClick={() => onEdit(todo.id)}
          className="px-2.5 py-1.5 rounded-md text-xs font-semibold cursor-pointer bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0] transition-all duration-200"
        >
          수정
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="px-2.5 py-1.5 rounded-md text-xs font-semibold cursor-pointer bg-[#ffe4e6] text-[#e11d48] hover:bg-[#fecdd3] transition-all duration-200"
        >
          삭제
        </button>
      </div>
    </li>
  );
}