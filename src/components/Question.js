import React, { useRef } from "react";
import "./Question.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ChatIcon from "@mui/icons-material/Chat";
import { useHistory } from "react-router";
import { voteQuestion } from "./../configs/networkManager";
import { useStateValue } from "./../context/StateProvider";

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
  const [{ token, user }, dispatch] = useStateValue();
  const upVoteRef = useRef();
  const downVoteRef = useRef();
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
  const upvoted = async () => {
    console.log("upvoted");
    try {
      const updatedPost = await voteQuestion(true, false, id, token);
      // add to questions state
      upvotes += 1;
      upVoteRef.current.style.color = "green";
      alert("post liked 👍");
    } catch (er) {
      alert("err updating vote");
      console.log(er);
    }
  };
  const downvoted = async () => {
    // console.log("downvoted");
    try {
      const updatedPost = await voteQuestion(false, true, id, token);
      // add to questions state
      downvotes += 1;
      // make it green
      downVoteRef.current.style.color = "red";
      // console.log();
      alert("post disliked 👍");
    } catch (er) {
      alert("err downvoting vote");
      console.log(er);
    }
  };
  return (
    <div className="question">
      <div className="question__left">
        <ArrowUpwardIcon onClick={upvoted} className="upvote" ref={upVoteRef} />
        <p>{upvotes}</p>
        <ArrowDownwardIcon
          onClick={downvoted}
          className="downvote"
          ref={downVoteRef}
        />
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
