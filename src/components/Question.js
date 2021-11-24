import React, { useRef, useState } from "react";
import "./Question.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ChatIcon from "@mui/icons-material/Chat";
import { useHistory } from "react-router";
import { voteQuestion } from "./../configs/networkManager";
import { useStateValue } from "./../context/StateProvider";
import DeleteIcon from "@mui/icons-material/Delete";
import { deletePost } from "./../configs/networkManager";

// this will be every single question
function Question({
  id,
  title,
  body,
  upvotes,
  downvotes,
  username,
  comments,
  dateOfPosting,
  renderFull,
  fetchUserAndQuestion,
  fetchQuestionsForUser,
}) {
  const [upVoteState, setupVoteState] = useState(upvotes);

  const [downVoteState, setdownVoteState] = useState(downvotes);
  // console.log("printing votes", upvotes, downvotes);
  const history = useHistory();
  const [{ token, user }, dispatch] = useStateValue();
  const upVoteRef = useRef();
  const downVoteRef = useRef();
  const redirectToQuestion = () => {
    history.push(
      `/question/${id}?data=${JSON.stringify({
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
    try {
      const updatedPost = await voteQuestion(true, false, id, token);
      // console.log("upvote question updatedPost:", updatedPost);

      // add to questions state
      // upvotes += 1;
      setupVoteState((_) => updatedPost.upVotes.length);
      // console.log("printing upvotes:", upVoteState);
      fetchUserAndQuestion(true);
      fetchQuestionsForUser && fetchQuestionsForUser(user.email, true);
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
      // downvotes += 1;
      setdownVoteState((_) => updatedPost.downVotes.length);
      fetchUserAndQuestion(true);
      fetchQuestionsForUser && fetchQuestionsForUser(user.email, true);
      // make it green
      downVoteRef.current.style.color = "red";
      // console.log();
      alert("post disliked 👍");
    } catch (er) {
      alert("err downvoting vote");
      console.log(er);
    }
  };
  const deletePostClicked = async () => {
    console.log("deleting...");
    await deletePost(id, token);
    fetchUserAndQuestion(true);
    fetchQuestionsForUser && fetchQuestionsForUser(user.email, true);
  };
  return (
    <div className="question">
      <div className="question__left">
        <ArrowUpwardIcon onClick={upvoted} className="upvote" ref={upVoteRef} />
        {/* <p>{upvotes}</p> */}
        <p>{upVoteState}</p>
        <ArrowDownwardIcon
          onClick={downvoted}
          className="downvote"
          ref={downVoteRef}
        />
        {/* <p>{downvotes}</p> */}
        <p>{downVoteState}</p>
      </div>
      <div className="question__right">
        <div className="question__right__top">
          <h1>
            <h1
              onClick={() => {
                redirectToQuestion();
              }}
            >
              {renderFull ? title : title.slice(0, 110) + "..."}
            </h1>{" "}
            {user?.email === username ? (
              <DeleteIcon
                className="mui_deleteIcon"
                onClick={deletePostClicked}
              />
            ) : null}
          </h1>
          <p>{renderFull ? body : body.slice(0, 340) + "..."}</p>
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
