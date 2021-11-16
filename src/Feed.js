import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import studentImage from "./assets/home_page.svg";
import "./Feed.css";
import Questions from "./Questions";
import { useStateValue } from "./context/StateProvider";
import axios from "./configs/axiosConfig";
import { getUserFromTokenLink } from "./configs/urls";
import { getAllQuestions } from "./configs/networkManager";

function Feed() {
  const [{ token, user }, dispatch] = useStateValue();
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    // when we get the token ask for user info
    // console.log(token);
    (async () => {
      axios
        .get(getUserFromTokenLink, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(async ({ data }) => {
          // console.log("user info:", data.user[0]);
          if (data.user[0]) {
            dispatch({
              type: "USER_FETCHED",
              user: data.user[0],
            });
            const questions = await getAllQuestions(token);
            if (questions) {
              setQuestions(questions);
            }
            console.log("questions:", questions);
          } else {
            alert("user not found make sure u login again");
          }
        })
        .catch((err) => {
          alert(`err getting user data @feed contact developer`);
          console.log(err);
        });
    })();
  }, []);
  return (
    <>
      <div className="feed">
        {/* <NavBar /> */}
        <div className="feed__header">
          <div className="feed__header__info">
            <h1>HAVE A</h1>
            <h1 className="feed__header__info__questionLabel">QUESTION?</h1>
            <p>
              Ask your academics related any question here, everyone including
              your peers,seniors and teachers can answer it, We give you rep
              based on your question and answer i.e community contribution in
              general, You can also Upvote or downVote other questions based on
              your opinions, A question can also be a statement of general
              situation just like a Tweet
            </p>
          </div>
          <div className="feed__header__image">
            <img src={studentImage} />
          </div>
        </div>
      </div>
      <Questions questions={questions} />
    </>
  );
}

export default Feed;
