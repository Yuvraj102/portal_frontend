import React, { useEffect, useState } from "react";
import "./Notes.css";
import SingleTeacher from "./SingleTeacher";
import Note from "./Note";
import { useParams } from "react-router-dom";
import { getTeacherByEmail, getNotes } from "./configs/networkManager";
import Spinner from "./Spinner";

function Notes() {
  const [teacher, setTeacher] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const [notes, setNotes] = useState(null);
  const params = useParams();
  const refetchNotesData = async () => {
    const email = params.id;

    // get notes
    const notes = await getNotes(email);
    setNotes(notes.notes);
  };
  useEffect(() => {
    // get teacher data

    (async () => {
      const email = params.id;
      // show loading
      setShowSpinner(true);
      const teacherInfo = await getTeacherByEmail(email);
      setTeacher(teacherInfo.teacher);
      // get notes
      const notes = await getNotes(email);
      setNotes(notes.notes);
      // remove loading
      setShowSpinner(false);
    })();
  }, []);
  return (
    <div className="notes">
      {/* get teacher with email and pass here <SingleTeacher teacher={teacher} />*/}
      {teacher && <SingleTeacher teacher={teacher} setLinkFalse />}
      <div className="notes__note">
        {notes &&
          notes.map((el) => (
            <Note
              note={el}
              setShowSpinner={setShowSpinner}
              refetchNotesData={refetchNotesData}
            />
          ))}
      </div>
      {showSpinner && <Spinner />}
    </div>
  );
}

export default Notes;
