import { useState } from "react";

const initialForm = {
  title: "",
  description: "",
  priority: "medium",
};

const TodoForm = ({ onSubmit, editingTodo, onCancel }) => {
  const [form, setForm] = useState(() => ({
    title: editingTodo?.title || "",
    description: editingTodo?.description || "",
    priority: editingTodo?.priority || "medium",
  }));

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) return;

    try {
      setSaving(true);

      const success = await onSubmit({
        ...form,
        title: form.title.trim(),
        description: form.description.trim(),
      });

      if (success !== false) {
        setForm(initialForm);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <h3>{editingTodo ? "Edit task" : "Create a new task"}</h3>

      <input
        name="title"
        placeholder="What needs to be done?"
        value={form.title}
        onChange={handleChange}
        minLength={3}
        maxLength={100}
        required
      />

      <textarea
        name="description"
        placeholder="Add some details..."
        value={form.description}
        onChange={handleChange}
        rows={3}
      />

      <select name="priority" value={form.priority} onChange={handleChange}>
        <option value="low">Low priority</option>
        <option value="medium">Medium priority</option>
        <option value="high">High priority</option>
      </select>

      <div className="form-actions">
        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : editingTodo ? "Update task" : "Add task"}
        </button>

        {editingTodo && (
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TodoForm;
