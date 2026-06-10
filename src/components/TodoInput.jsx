import { useState } from "react";

export default function TodoInput({ onAddTodo }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      alert("할 일을 입력해주세요.");
      return;
    }
    onAddTodo(text.trim());
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2.5 mb-5">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="새로운 할일을 입력하세요"
        autoComplete="off"
        className="flex-1 px-4 py-3 border-2 border-[#e2e8f0] rounded-lg text-sm outline-none focus:border-[#672be0] transition-colors duration-200"
      />
      <button
        type="submit"
        className="bg-[#672be0] text-white px-5 py-3 rounded-lg text-sm font-semibold cursor-pointer hover:bg-[#521cb8] transition-colors duration-200"
      >
        추가
      </button>
    </form>
  );
}