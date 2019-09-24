import React from "react";
import "./style.css";

function Results({ children }) {
  return (
    <div className="Results" id="Results">
      {children}
    </div>
  );
}

export default Results;
