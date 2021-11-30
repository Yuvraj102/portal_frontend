import React from "react";
import "./CustomAlert.css";
function CustomAlert({ text, customAlertRef }) {
  return (
    <div className="customAlert" ref={customAlertRef}>
      <h3>
        {text} <span>just joined the chat.</span>
      </h3>
    </div>
  );
}

export default CustomAlert;
