import React from "react";

function Filters({ filter, setFilter }) {
  return (
    <div className="filters">
      <button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>
        All
      </button>
      <button onClick={() => setFilter("read")} className={filter === "read" ? "active" : ""}>
        Read
      </button>
      <button onClick={() => setFilter("unread")} className={filter === "unread" ? "active" : ""}>
        Unread
      </button>
      <button onClick={() => setFilter("favorites")} className={filter === "favorites" ? "active" : ""}>
        Favorites
      </button>
    </div>
  );
}

export default Filters;
