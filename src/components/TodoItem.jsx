import { useState } from "react";

export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  // 1. 인라인 에러를 관리할 상태 추가
  const [isError, setIsError] = useState(false);

  const handleSave = () => {
    if (!editText.trim()) {
      // 2. alert 대신 에러 상태를 true로 변경
      setIsError(true);
      return;
    }
    onEdit(todo.id, editText.trim());
    setIsEditing(false); 
    setIsError(false); // 저장 성공 시 에러 초기화
  };

  return (
    <li
      className={`flex justify-between items-center p-3.5 px-4 bg-white border rounded-lg transition-all duration-200 ${
        todo.completed ? "bg-[#f8fafc] border-[#e2e8f0]" : "border-[#edf2f7]"
      }`}
    >
      {isEditing ? (
        // 3. 에러 메시지를 아래에 배치하기 위해 flex-col 구조의 div로 감싸줌
        <div className="flex-1 flex flex-col mr-3">
          <input
            type="text"
            value={editText}
            onChange={(e) => {
              setEditText(e.target.value);
              if (e.target.value.trim()) setIsError(false); // 글자를 입력하면 에러 실시간 해제
            }}
            // 4. 에러 상태(isError)에 따라 테두리 색상을 빨간색(border-red-500)으로 변경
            className={`w-full px-2 py-1 border-2 rounded-md text-sm outline-none bg-white transition-all ${
              isError 
                ? "border-red-500 focus:border-red-500" 
                : "border-[#672be0] focus:border-[#672be0]"
            }`}
            autoFocus
          />
          {/* 5. 에러가 발생했을 때만 보여주는 인라인 에러 메시지 */}
          {isError && (
            <span className="text-red-500 text-xs mt-1 ml-1 font-medium">
              할 일을 입력해주세요.
            </span>
          )}
        </div>
      ) : (
        <span
          className={`text-[15px] break-all flex-1 mr-3 transition-all duration-200 ${
            todo.completed ? "line-through text-[#94a3b8]" : "text-[#334155]"
          }`}
        >
          {todo.text}
        </span>
      )}

      <div className="flex gap-1.5 items-center">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="px-2.5 py-1.5 rounded-md text-xs font-semibold cursor-pointer bg-[#672be0] text-white hover:bg-[#521cb8]"
            >
              저장
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditText(todo.text); 
                setIsError(false); // 취소 시 에러 초기화
              }}
              className="px-2.5 py-1.5 rounded-md text-xs font-semibold cursor-pointer bg-gray-200 text-[#475569] hover:bg-gray-300"
            >
              취소
            </button>
          </>
        ) : (
          <>
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
              onClick={() => setIsEditing(true)}
              className="px-2.5 py-1.5 rounded-md text-xs font-semibold cursor-pointer bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]"
            >
              수정
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="px-2.5 py-1.5 rounded-md text-xs font-semibold cursor-pointer bg-[#ffe4e6] text-[#e11d48] hover:bg-[#fecdd3]"
            >
              삭제
            </button>
          </>
        )}
      </div>
    </li>
  );
}