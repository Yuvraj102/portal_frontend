import "./App.css";
import React, { useEffect, useState } from "react";
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

function App() {
  const [state, dispatch] = useStateValue();
  const [loginUrl, setLoginUrl] = useState(null);
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
              <Feed />
            </Route>
            <Route path="/profile" exact>
              <Profile />
            </Route>
            <Route path="/ask" exact>
              <h1>Create Question</h1>
              <CreateQuestion />
            </Route>
            <Route path="/question/:questionId" exact>
              <Reply />
            </Route>
          </>
        )}
        <Route path="*" exact component={PageNotFound} />
      </Switch>
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
