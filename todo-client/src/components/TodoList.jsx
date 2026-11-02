import TodoCard from "./TodoCard";

const TodoList = ({ todos, onToggle, onEdit, onDelete }) => {
  if (!todos.length) {
    return (
      <div className="empty-state">
        <h3>No tasks found</h3>
        <p>Create a new task to get started.</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoCard
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
