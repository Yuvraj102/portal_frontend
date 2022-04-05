import React, { useRef, useState, useEffect } from "react";
import "./Profile.css";
import toyFaceImage from "./assets/toy_face.jpg";
import WarningComponent from "./components/WarningComponent";
import { useStateValue } from "./context/StateProvider";
import { updateUserInDb } from "./configs/networkManager";
import { useHistory } from "react-router-dom";
import Questions from "./Questions";
import { Link } from "react-router-dom";
function Profile({
  hiddenDivRef,
  questionstitle,
  fetchQuestionsForUser,
  fetchUserAndQuestion,
}) {
  const [{ user, token, questionsForUser }, dispatch] = useStateValue();
  const history = useHistory();
  const saveBtn = useRef();
  const selectTag = useRef();
  const collegeTag = useRef();
  const deptTag = useRef();
  const textAreaTag = useRef();
  const [shwWarning, setShwWarning] = useState(false);
  const [oldValues, setOldValues] = useState({
    collegeName: user ? user.college : "fetching...",
    deptName: user ? user.department : "fetching...",
    bio: user ? user.bio : "fetching...",
    desig: user ? user.designation : "fetching...",
  });
  useEffect(() => {
    fetchQuestionsForUser(user.email);
  }, []);
  const editClicked = (e) => {
    selectTag.current.disabled = false;
    collegeTag.current.readOnly = false;
    deptTag.current.readOnly = false;
    saveBtn.current.hidden = false;
    textAreaTag.current.readOnly = false;
    // bio not greater than 200, collegeName not greater than 50,dept maxlen: 30
  };
  const saveClicked = async (e) => {
    // check constraints
    if (
      textAreaTag.current.value.length <= 200 &&
      collegeTag.current.value.length <= 50 &&
      deptTag.current.value.length <= 30
    ) {
      // send save request
      saveBtn.current.hidden = true;
      selectTag.current.disabled = true;
      collegeTag.current.readOnly = true;
      deptTag.current.readOnly = true;
      textAreaTag.current.readOnly = true;
      // get values
      let bio = textAreaTag.current.value || "no bio at the moment..";
      let college = collegeTag.current.value || "not available at the time";
      let department = deptTag.current.value || "all";
      let designation = selectTag.current.value || "student";
      if (bio && college && department && designation) {
        // send update request
        const updatedUser = await updateUserInDb(
          { bio, college, department, designation },
          token
        );
        // console.log(updatedUser);
        if (updatedUser) {
          // user successfully updated send dispatch
          dispatch({
            type: "USER_FETCHED",
            user: updatedUser,
          });
        }
      }
      setShwWarning(false);
    } else {
      // show warning

      setShwWarning(true);
    }
  };
  const logout = () => {
    history.replace("/");
  };
  return (
    <div className="profile">
      <h1>PROFILE</h1>
      <button className="editButton" onClick={editClicked}>
        Edit
      </button>
      <button className="logoutButton" onClick={logout}>
        Logout
      </button>
      <button ref={saveBtn} className="editButton" hidden onClick={saveClicked}>
        save
      </button>
      {user?.designation == "teacher" && (
        <Link
          className="editButton"
          to={user ? `/${user?.email}/notes` : "/signin"}
        >
          my notes
        </Link>
      )}
      {shwWarning && (
        <WarningComponent text="check if bio not greater than 200 characters, collegeName not greater than 50 characters,dept not greater than 30 characters" />
      )}
      <div className="profile__div">
        <div className="profile__div__info">
          <label>Name</label>
          <h3>{user ? user.username : "fetching..."}</h3>
          <label>Email</label>
          <h3>{user ? user.email : "fetching..."}</h3>
          <label>Bio</label>
          <textarea
            rows="4"
            placeholder="enter bio  200 characters only"
            ref={textAreaTag}
            readOnly
            cols="30"
          >
            {oldValues.bio}
          </textarea>
          <label>
            College Name <span>{oldValues.collegeName}</span>
          </label>
          <input
            placeholder="not mentioned (enter name only 50 characters max allowed)"
            // value={oldValues.collegeName}
            readOnly
            ref={collegeTag}
          />

          <label>
            Department <span>{oldValues.deptName}</span>
          </label>
          <input
            placeholder="dept for example computer, mechanical only 30 characters allowed"
            // value={oldValues.deptName}
            readOnly
            ref={deptTag}
          />
          <label>
            Designation <span>{oldValues.desig}</span>
          </label>
          <select disabled ref={selectTag}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <div className="profile__div__photo">
          <img src={user ? user.profilePhotoUrl : toyFaceImage} />
        </div>
      </div>
      {/* all questions by that user */}
      <Questions
        questionstitle={questionstitle}
        questions={questionsForUser}
        fetchUserAndQuestion={fetchUserAndQuestion}
        fetchQuestionsForUser={fetchQuestionsForUser}
        hiddenDivRef={hiddenDivRef}
        profileQuestions
      />
    </div>
  );
}

export default Profile;
