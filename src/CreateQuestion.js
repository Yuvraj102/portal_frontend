import React, { useState, useRef } from "react";
import "./CreateQuestion.css";
import { Link } from "react-router-dom";
import WarningComponent from "./components/WarningComponent";
import { useStateValue } from "./context/StateProvider";
import {
  createComment,
  createQuestion,
  uploadFile,
} from "./configs/networkManager";
import { useHistory } from "react-router-dom";
import Spinner from "./Spinner";

function CreateQuestion({ reply, postId, setComments }) {
  const [title, setTitle] = useState(0);
  const history = useHistory();
  const [showSpinner, setShowSpinner] = useState(false);
  const [{ token, user }, dispatch] = useStateValue();
  const fileUploadRef = useRef();
  const titleRef = useRef();
  const submitBtn = useRef();

  const titleFieldChanged = (e) => {
    const titleValue = e.target.value;
    setTitle(titleValue.length);

    if (titleValue.length >= 200) {
      // show warning comp
      // console.log("greater");
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
        // console.log("requested create post:", titleValue, bodyValue);
        if (createQuestion) {
          // add to questions state
          dispatch({
            type: "FEED_QUESTIONS_FETCHED",
            questions: [],
          });
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
  const handleFileChange = (event) => {
    console.log(event.target.files);
    if (event.target.files && event.target.files[0]?.size <= 5000000) {
    } else {
      event.target.value = "";
      alert(
        "Single File is allowed only and the size must be less than 5mb, also the file must be in pdf format"
      );
    }
  };
  const handleUploadClick = async () => {
    // when file upload is clicked
    if (
      fileUploadRef.current.files &&
      fileUploadRef.current.files[0]?.size <= 5000000 &&
      titleRef.current.value
    ) {
      // upload the note , show spinner
      setShowSpinner(true);

      // also take care of token & owner of the file upload
      // @TODO: uncomment below
      const respData = await uploadFile(
        titleRef.current.value,
        fileUploadRef.current.files[0],
        token
      );
      console.log("data", respData);
      // redirect to notes
      history.push(`/${user.email}/notes`);
      setShowSpinner(false);
      // if (respData.status == "fail") {
      //   alert("failed to upload file");
      //   setShowSpinner(false);
      // } else {
      //   setShowSpinner(false);
      //   alert("Notes upload successfully");
      // }
    } else {
      fileUploadRef.current.value = "";
      alert(
        "Single File is allowed only and the size must be less than 5mb, also the file must be in pdf format, title should not be empty"
      );
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
        {/* notes upload , @TODO set 1 to user.designation === "teacher" */}
        {user.designation == "teacher" && (
          <div className="createQuestion__box uploadNotes__box">
            <label>Upload notes (title)</label>
            <input
              required
              placeholder="Enter title for notes"
              name="notes__title"
              type="text"
              className="notes__title"
              ref={titleRef}
            ></input>
            <input
              required
              placeholder="Upload Notes"
              name="notes__file"
              ref={fileUploadRef}
              accept="application/pdf"
              onInput={handleFileChange}
              type="file"
            ></input>
            <button
              type="submit"
              onClick={handleUploadClick}
              className="uploadNotes__btn"
            >
              Upload Notes
            </button>
          </div>
        )}
      </div>
      <Link to={token ? "/feed" : "/"}>Go Back </Link>
      {showSpinner && <Spinner />}
    </div>
  );
}

export default CreateQuestion;
