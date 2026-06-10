import { useState, useEffect } from "react";
import DateNavigator from "./components/DateNavigator"; // ✨ 이름 변경됨
import TodoInput from "./components/TodoInput";
import FilterTabs from "./components/FilterTabs";
import TodoList from "./components/TodoList";

// 'YYYY-MM-DD' 포맷 생성 유틸 함수
const getFormatDateString = (dateObj) => {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("minimalTodos");
    return saved ? JSON.parse(saved) : [];
  });
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentFilter, setCurrentFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("minimalTodos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      date: getFormatDateString(currentDate),
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const handleToggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleEditTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (!todoToEdit) return;

    const updatedText = prompt("할 일을 수정하세요:", todoToEdit.text);
    if (updatedText === null) return;

    const trimmedText = updatedText.trim();
    if (trimmedText === "") {
      alert("할 일을 입력해주세요.");
      return;
    }

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: trimmedText } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleChangeDate = (days) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + days);
      return newDate;
    });
  };

  const targetDateStr = getFormatDateString(currentDate);
  const dateFilteredTodos = todos.filter((todo) => todo.date === targetDateStr);

  const filteredTodos = dateFilteredTodos.filter((todo) => {
    if (currentFilter === "active") return !todo.completed;
    if (currentFilter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f9f9fa] flex justify-center items-start pt-[100px] px-4 font-sans">
      <div className="bg-white w-full max-w-[450px] p-[30px] rounded-[16px] shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
        <h1 className="text-[#222222] text-2xl font-bold mb-6 text-center tracking-tight">
          Minimal Todo
        </h1>

        {/* ✨ 바뀐 컴포넌트 이름 적용 */}
        <DateNavigator currentDate={currentDate} onChangeDate={handleChangeDate} />
        <TodoInput onAddTodo={handleAddTodo} />
        
        <FilterTabs currentFilter={currentFilter} onFilterChange={setCurrentFilter} />
        <TodoList
          todos={filteredTodos}
          onToggle={handleToggleTodo}
          onEdit={handleEditTodo}
          onDelete={handleDeleteTodo}
        />
      </div>
    </div>
  );
}

export default App;