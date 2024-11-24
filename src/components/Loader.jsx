import React from "react";
import "./Loader.css"; // Add your custom styles here

function Loader() {
  return (
    <div className="loader">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}

export default Loader;
