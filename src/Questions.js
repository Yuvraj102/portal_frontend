// this will have all the questions
import React, { useRef } from "react";
import "./Questions.css";
import Question from "./components/Question";
import ReplayIcon from "@mui/icons-material/Replay";
import { useStateValue } from "./context/StateProvider";

function Questions({
  questions,
  fetchUserAndQuestion,
  fetchQuestionsForUser,
  hiddenDivRef,
  questionstitle,
  profileQuestions,
}) {
  const [{ user }, _] = useStateValue();
  const replayClicked = () => {
    fetchUserAndQuestion(true);
    fetchQuestionsForUser && fetchQuestionsForUser(user.email, true);
    hiddenDivRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="questions">
      <h1>
        {questionstitle}{" "}
        {/*profileQuestions ? null :*/ <ReplayIcon onClick={replayClicked} />}
      </h1>
      {/* {console.log("in questions comp", questions[0]?.upVotes.length)} */}
      {questions.map((el) => (
        <Question
          key={el._id}
          id={el._id}
          title={el.title}
          body={el.body}
          upvotes={el.upVotes.length}
          downvotes={el.downVotes.length}
          username={el.from}
          comments={[]}
          dateOfPosting={el.date}
          fetchUserAndQuestion={fetchUserAndQuestion}
          fetchQuestionsForUser={fetchQuestionsForUser}
        />
      ))}
    </div>
  );
}

export default Questions;
