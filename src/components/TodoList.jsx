import TodoItem from "./TodoItem";

export default function TodoList({ todos, onToggle, onEdit, onDelete }) {
  return (
    <ul className="flex flex-col gap-3 list-none">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}