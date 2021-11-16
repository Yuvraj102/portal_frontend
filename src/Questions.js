// this will have all the questions
import React from "react";
import "./Questions.css";
import Question from "./components/Question";
function Questions({ questions }) {
  return (
    <div className="questions">
      <h1>CURATED FOR YOU..</h1>
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
        />
      ))}
    </div>
  );
}

export default Questions;
