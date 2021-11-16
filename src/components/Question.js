import React from "react";
import "./Question.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ChatIcon from "@mui/icons-material/Chat";
import { useHistory } from "react-router";
// this will be every single question
function Question({
  key,
  id,
  title,
  body,
  upvotes,
  downvotes,
  username,
  comments,
  dateOfPosting,
  renderFull,
}) {
  const history = useHistory();
  const redirectToQuestion = () => {
    history.push(
      `/question/${key}?data=${JSON.stringify({
        id,
        title,
        body,
        upvotes,
        downvotes,
        username,
        comments,
        dateOfPosting,
      })}`
    );
  };
  return (
    <div className="question">
      <div className="question__left">
        <ArrowUpwardIcon />
        <p>{upvotes}</p>
        <ArrowDownwardIcon />
        <p>{downvotes}</p>
      </div>
      <div className="question__right">
        <div className="question__right__top">
          <h1
            onClick={() => {
              redirectToQuestion();
            }}
          >
            {renderFull ? title : title.slice(0, 110)}...
          </h1>
          <p>{renderFull ? body : body.slice(0, 340)}...</p>
        </div>
        <div className="question__right__bottom">
          <p>{username}</p>
          <p
            onClick={() => {
              redirectToQuestion();
            }}
          >
            <ChatIcon />
            {/*uncomment this later {comments.length} */}
          </p>
          <p>{dateOfPosting}</p>
        </div>
      </div>
    </div>
  );
}

export default Question;
