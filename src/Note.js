import React from "react";
import "./Note.css";
// THIS IS ONE PARTICULAR NOTE PDF
import { deleteNote } from "./configs/networkManager";
import { useHistory } from "react-router-dom";
import { useStateValue } from "./context/StateProvider";
function Note({ note, setShowSpinner, refetchNotesData }) {
  const history = useHistory();
  const [{ token, user }, dispatch] = useStateValue();
  const deleteNotePressed = async () => {
    const consent = window.confirm("Do you wish to delete the note?");
    if (!consent) {
      return;
    }
    // show loading
    setShowSpinner(true);
    const resp = await deleteNote(note._id, token);
    await refetchNotesData();
    history.replace(`/${note.postedBy}/notes`);
    setShowSpinner(false); // remove loading screen
    //@TODO refect
  };
  return (
    <div className="note">
      <h3 className="note__title">{note?.title}</h3>
      <a target="_blank" href={note?.downloadUrl} className="note__download">
        {" "}
        Download
      </a>
      {user?.designation == "teacher" && user?.email == note.postedBy && (
        <button className="note__download" onClick={deleteNotePressed}>
          🗑
        </button>
      )}
    </div>
  );
}

export default Note;
