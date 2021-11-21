import "./App.css";
import React, { useEffect, useState, useRef } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
import RegisterLogin from "./RegisterLogin";
import { useStateValue } from "./context/StateProvider";
import Feed from "./Feed";
import PageNotFound from "./PageNotFound";
import Profile from "./Profile";
import NavBar from "./components/NavBar";
import CreateQuestion from "./CreateQuestion";
import Reply from "./Reply";
import axios from "./configs/axiosConfig";
import { getloginUrlLink } from "./configs/urls";
import { getUserFromTokenLink } from "./configs/urls";
import { getAllQuestions } from "./configs/networkManager";

function App() {
  const [state, dispatch] = useStateValue();
  const [loginUrl, setLoginUrl] = useState(null);
  let hiddenDivRef = useRef();
  const [{ token, user, feedQuestions }, _] = useStateValue();

  const fetchUserAndQuestion = async (forceFetch = false) => {
    if (!user || !feedQuestions.length || forceFetch) {
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
            // get questions
            const questions = await getAllQuestions(token);
            if (questions) {
              // we get questions
              dispatch({
                type: "FEED_QUESTIONS_FETCHED",
                questions: questions,
              });

              console.log(" fetching..");
            }
          } else {
            alert("user not found make sure u login again");
          }
        })
        .catch((err) => {
          alert(`err getting user data @feed contact developer`);
          console.log(err);
        });
    } else {
      console.log("not fetching");
    }
  };

  useEffect(() => {
    (async () => {
      axios
        .get(getloginUrlLink)
        .then(({ data }) => {
          setLoginUrl(data.login_url);
        })
        .catch((err) => {
          // err redirect to home
          alert("we have some problem in google login page");
        });
    })();
  }, []);
  return (
    <div className="app">
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/signin" exact>
          <RegisterLogin loginUrl={loginUrl} />
        </Route>
        {state.token && (
          <>
            <NavBar />
            <Route path="/feed" exact>
              <Feed
                hiddenDivRef={hiddenDivRef}
                fetchUserAndQuestion={fetchUserAndQuestion}
              />
            </Route>
            <Route path="/profile" exact>
              <Profile />
            </Route>
            <Route path="/ask" exact>
              <h1>Create Question</h1>
              <CreateQuestion />
            </Route>
            <Route path="/question/:questionId" exact>
              <Reply fetchUserAndQuestion={fetchUserAndQuestion} />
            </Route>
          </>
        )}
        <Route path="*" exact component={PageNotFound} />
      </Switch>
      <div ref={hiddenDivRef}></div>
      <a
        href="https://yuvraj-agarkar.netlify.app/"
        target="_blank"
        className="creator"
      >
        Creator @Yuvraj Agarkar
      </a>
    </div>
  );
}

export default App;
