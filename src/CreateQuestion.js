import React, { useState, useRef } from "react";
import "./CreateQuestion.css";
import { Link } from "react-router-dom";
import WarningComponent from "./components/WarningComponent";
import { useStateValue } from "./context/StateProvider";
import { createComment, createQuestion } from "./configs/networkManager";
import { useHistory } from "react-router-dom";

function CreateQuestion({ reply, postId, setComments }) {
  const [title, setTitle] = useState(0);
  const history = useHistory();
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
    const textarea = event.target.body_text;
    const title = event.target.title_text;
    if (reply) {
      // this is reply not new question, so create a reply
      // console.log(event.target.body_text.value);

      if (textarea.value) {
        let newComment = await createComment(postId, textarea.value, token);
        // console.log("new created comment", newComment);
        if (newComment) {
          alert("posted 👍");
          setComments((prevComments) => {
            // console.log("prev Comments:", prevComments);

            return [...prevComments, newComment];
          });
        }
      }
    } else {
      // create question page
      const titleValue = title.value;
      const bodyValue = textarea.value;
      if (titleValue && bodyValue) {
        // create post
        const createdQuestion = await createQuestion(
          titleValue,
          bodyValue,
          token
        );
        console.log("requested create post:", titleValue, bodyValue);
        if (createQuestion) {
          // add to questions state
          history.replace("/feed");
        } else {
          alert("there was some issue creating question");
        }

        // console.log(token);
      } else {
        alert("fill all the fields");
      }
    }
    textarea.value = "";
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
                name="title_text"
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
      <Link to={token ? "/feed" : "/"}>Go Back </Link>
    </div>
  );
}

export default CreateQuestion;
