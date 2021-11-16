import React from "react";
import "./Comment.css";
function Comment({ username, body }) {
  return (
    <div className="comment">
      <label>{username}</label>
      <p>{body}</p>
    </div>
  );
}

export default Comment;
