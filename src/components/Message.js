import React from "react";
import "./Message.css";
function Message({ from, message }) {
  return (
    <div className="message">
      <p>{from}</p>
      <h4>{message}</h4>
    </div>
  );
}

export default Message;
