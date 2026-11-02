const TodoStats = ({ todos }) => {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const pending = total - completed;

  const stats = [
    { label: "Total Tasks", value: total },
    { label: "Completed", value: completed },
    { label: "Pending", value: pending },
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat) => (
        <div className="stat-card" key={stat.label}>
          <p>{stat.label}</p>
          <h2>{stat.value}</h2>
        </div>
      ))}
    </div>
  );
};

export default TodoStats;
