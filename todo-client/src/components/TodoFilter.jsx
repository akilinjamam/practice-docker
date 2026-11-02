const TodoFilter = ({ activeFilter, setActiveFilter }) => {
  const filters = ["all", "pending", "completed"];

  return (
    <div className="filter-group">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`filter-btn ${activeFilter === filter ? "active" : ""}`}
          onClick={() => setActiveFilter(filter)}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default TodoFilter;
