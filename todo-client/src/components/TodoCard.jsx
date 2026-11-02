const TodoCard = ({ todo, onToggle, onEdit, onDelete }) => {
  return (
    <article className={`todo-card ${todo.completed ? "done" : ""}`}>
      <div className="todo-main">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo)}
        />

        <div className="todo-content">
          <h3>{todo.title}</h3>

          {todo.description && <p>{todo.description}</p>}

          <div className="todo-meta">
            <span className={`priority ${todo.priority}`}>{todo.priority}</span>

            <span>{new Date(todo.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="todo-actions">
        <button onClick={() => onEdit(todo)}>Edit</button>
        <button className="delete-btn" onClick={() => onDelete(todo._id)}>
          Delete
        </button>
      </div>
    </article>
  );
};

export default TodoCard;
