import React from "react";
import "./SingleTeacher.css";
import { Link } from "react-router-dom";
function SingleTeacher({ teacher, setLinkFalse }) {
  return (
    <Link
      to={setLinkFalse ? "#" : teacher.email + "/notes"}
      className="singleTeacher__anchor"
    >
      <div className="singleTeacher">
        <div className="singleTeacher__first">
          <img src={teacher.profilePhotoUrl} alt="/placeholder.webp" />
        </div>
        <div className="singleTeacher__second">
          <h3>{teacher.username}</h3>
          <p>{teacher.bio}</p>
        </div>
      </div>
    </Link>
  );
}

export default SingleTeacher;
