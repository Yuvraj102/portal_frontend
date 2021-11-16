import React from "react";
import "./WarningComponent.css";
function WarningComponent({ text }) {
  return (
    <div className="warning">
      <h4>{text}</h4>
    </div>
  );
}

export default WarningComponent;
