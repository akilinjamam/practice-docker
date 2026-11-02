import { useMemo, useState } from "react";

import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoStats from "./components/TodoStats";
import TodoFilter from "./components/TodoFilter";
import TodoList from "./components/TodoList";

import { useTodos } from "./hooks/useTodos";

function App() {
  const { todos, loading, error, createTodo, updateTodo, deleteTodo } =
    useTodos();

  const [activeFilter, setActiveFilter] = useState("all");
  const [editingTodo, setEditingTodo] = useState(null);
  const [actionError, setActionError] = useState("");

  const filteredTodos = useMemo(() => {
    if (activeFilter === "completed") {
      return todos.filter((todo) => todo.completed);
    }

    if (activeFilter === "pending") {
      return todos.filter((todo) => !todo.completed);
    }

    return todos;
  }, [todos, activeFilter]);

  const handleSubmit = async (payload) => {
    try {
      setActionError("");

      if (editingTodo) {
        await updateTodo(editingTodo._id, payload);
        setEditingTodo(null);
      } else {
        await createTodo(payload);
      }
    } catch (err) {
      setActionError(err.message);
      throw err;
    }
  };

  const handleToggle = async (todo) => {
    try {
      setActionError("");
      await updateTodo(todo._id, {
        completed: !todo.completed,
      });
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      setActionError("");
      await deleteTodo(id);

      if (editingTodo?._id === id) {
        setEditingTodo(null);
      }
    } catch (err) {
      setActionError(err.message);
      return false;
    }
  };

  return (
    <div className="app">
      <Header />

      <main className="container">
        <section className="welcome">
          <p className="eyebrow">YOUR PRODUCTIVITY SPACE</p>
          <h1>Manage your tasks.</h1>
          <p>Organize your day, one task at a time.</p>
        </section>

        <TodoStats todos={todos} />

        <TodoForm
          onSubmit={handleSubmit}
          editingTodo={editingTodo}
          onCancel={() => setEditingTodo(null)}
        />

        <section className="tasks-section">
          <div className="section-heading">
            <h2>Your tasks</h2>
            <TodoFilter
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />
          </div>

          {actionError && <p className="error-message">{actionError}</p>}

          {loading ? (
            <p className="status-message">Loading tasks...</p>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <TodoList
              todos={filteredTodos}
              onToggle={handleToggle}
              onEdit={setEditingTodo}
              onDelete={handleDelete}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
