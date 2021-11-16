import React, { useState, useRef } from "react";
import "./CreateQuestion.css";
import { Link } from "react-router-dom";
import WarningComponent from "./components/WarningComponent";
import { useStateValue } from "./context/StateProvider";
import { createComment } from "./configs/networkManager";

function CreateQuestion({ reply, postId, setComments }) {
  const [title, setTitle] = useState(0);
  const [{ token }, dispatch] = useStateValue();
  const submitBtn = useRef();
  const titleFieldChanged = (e) => {
    const titleValue = e.target.value;
    setTitle(titleValue.length);

    if (titleValue.length >= 200) {
      // show warning comp
      console.log("greater");
      submitBtn.current.disabled = true;
    } else {
      submitBtn.current.disabled = false;
    }
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (reply) {
      // this is reply not new question, so create a reply
      // console.log(event.target.body_text.value);
      const textarea = event.target.body_text;
      if (textarea.value) {
        let newComment = await createComment(postId, textarea.value, token);
        console.log("new created comment", newComment);
        if (newComment) {
          setComments((prevComments) => {
            // console.log("prev Comments:", prevComments);
            alert("posted 👍");
            return [...prevComments, newComment];
          });
        }
      }
    }
  };
  return (
    <div className="createQuestion">
      {title >= 200 && (
        <WarningComponent text="title cannot be more than 200 characters" />
      )}
      <div className="createQuestion__box">
        <form onSubmit={handleFormSubmit}>
          {!reply && (
            <>
              <label>
                TITLE <span>{title}</span>
              </label>
              <input
                required
                placeholder="Enter title less than 200 characters"
                onChange={titleFieldChanged}
              ></input>
            </>
          )}
          <label>BODY</label>
          <textarea
            placeholder="Enter your problem or question"
            rows="5"
            cols="50"
            required
            name="body_text"
          ></textarea>
          <button ref={submitBtn} type="submit">
            Submit
          </button>
        </form>
      </div>
      <Link to="/">Go Back to Home</Link>
    </div>
  );
}

export default CreateQuestion;
