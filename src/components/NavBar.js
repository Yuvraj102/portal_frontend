import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import toyFaceImage from "./../assets/toy_face.jpg";
import { useStateValue } from "./../context/StateProvider";
import ChatIcon from "@mui/icons-material/Chat";

function NavBar() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="Navbar">
      <Link to="/feed">
        <h1>PORTAL</h1>
      </Link>
      <div>
        <Link to="/ask" className="ask">
          Ask a question
        </Link>
        <Link to="/chat">
          <ChatIcon className="chat_icon" />
        </Link>
        <Link to="/profile">
          <img src={user ? user.profilePhotoUrl : toyFaceImage} />
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
