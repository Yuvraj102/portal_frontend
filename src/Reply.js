import React, { useEffect, useState } from "react";
import "./Reply.css";
import Question from "./components/Question";
import CreateQuestion from "./CreateQuestion";
import { useParams } from "react-router-dom";
import Comment from "./components/Comment";
import { useLocation } from "react-router-dom";
import { getCommentsOnPost } from "./configs/networkManager";
import { useStateValue } from "./context/StateProvider";

function Reply() {
  const { search } = useLocation();
  const [{ token }, dispatch] = useStateValue();
  let [question, setQuestions] = useState({});
  const [comments, setComments] = useState([]);
  useEffect(async () => {
    // key is ID
    // console.log(search);
    const questionData = JSON.parse(search.slice(1).split("=")[1]);
    // console.log(questionData);
    // console.log(questionData.id);
    const postComments = await getCommentsOnPost(questionData.id, token);
    // console.log("comments:", comments);
    setComments(postComments);
    setQuestions(questionData);
  }, []);
  const { questionId } = useParams();
  return (
    <div className="reply">
      <Question
        title={question?.title}
        body={question?.body}
        upvotes={question?.upvotes}
        downvotes={question?.downvotes}
        username={question?.username}
        comments={[]}
        dateOfPosting={question?.dateOfPosting}
        renderFull
      />
      <CreateQuestion reply postId={question.id} setComments={setComments} />
      <div className="reply_comments">
        {comments.map((el) => (
          <Comment username={el.from} body={el.body} />
        ))}
      </div>
    </div>
  );
}

export default Reply;
