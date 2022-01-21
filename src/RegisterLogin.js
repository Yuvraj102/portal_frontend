import React, { useEffect, useState, useRef } from "react";
import "./RegisterLogin.css";
import loginSvg from "./assets/login.svg";
import google from "./assets/google.svg";
import { useLocation, useHistory } from "react-router-dom";
import { useStateValue } from "./context/StateProvider";

function RegisterLogin({ loginUrl }) {
  // check for tokens in arguments
  const history = useHistory();
  const [state, dispatch] = useStateValue();
  const { search } = useLocation();

  const checkToken = () => {
    let query = search.slice(1);
    const queryArgs = search.split("&");
    const status = queryArgs[0]?.split("=")[1];
    const token = queryArgs[1]?.split("=")[1];
    // console.log("stat:", status, "tkn:", token);
    if (token && status) {
      dispatch({
        type: "LOGIN",
        token,
      });

      history.replace("/feed");
    } else {
      // for now we wont do anything
    }
  };
  useEffect(() => {
    checkToken();
  }, []);

  return (
    <div className="registerLogin">
      <div className="registerLogin_box">
        <div className="registerLogin_box_image">
          <img src={loginSvg} />
        </div>
        <div className="registerLogin_box_cred">
          <h1>WELCOME GUYS!</h1>
          <a href={loginUrl} className={`${loginUrl ? "" : "disable_anchor"}`}>
            <img src={google} /> Sign in with google
          </a>
          <p>
            WE are still building this project and this is supposed to be a beta
            version of one of the feature of our gigantic platform ,feel free to
            signin see you on the other side
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterLogin;
