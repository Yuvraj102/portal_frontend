import React, { useEffect, useRef, useState } from "react";
import "./Teahers.css";
import SingleTeacher from "./SingleTeacher.js";
import { getTeachers } from "./configs/networkManager";
import Spinner from "./Spinner";
function Teachers() {
  const searchRef = useRef();
  const [searchedTeachers, setSearchedTeachers] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const crossClicked = () => {
    searchRef.current.value = "";
  };
  useEffect(() => {
    (async () => {
      setShowSpinner(true);
      const teachers = await getTeachers();
      setSearchedTeachers(teachers.teachers);
      setShowSpinner(false);
    })();
  }, []);
  const searchChanged = async (event) => {
    const teachers = await getTeachers(searchRef.current.value.toLowerCase());
    setSearchedTeachers(teachers.teachers);
  };
  return (
    <div className="teachers">
      <header>
        <input
          placeholder="Enter Name Of Teacher to search"
          name="teacher_search"
          ref={searchRef}
          className="cross__search"
          onChange={searchChanged}
        />
        <button onClick={crossClicked} className="teachers__cross">
          &times;
        </button>
      </header>
      <div>
        {searchedTeachers.map((el) => (
          <SingleTeacher teacher={el} />
        ))}
      </div>
      {showSpinner && <Spinner />}
    </div>
  );
}

export default Teachers;
