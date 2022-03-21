import React from "react";

const Note = (props) => {
  const updateTitle = (e) => {
    const updatedText = e.target.value;
    const editedNoteID = props.note.id;
    props.onType(editedNoteID, "title", updatedText);
  };

  const updateDescription = (e) => {
    const updatedText = e.target.value;
    const editedNoteID = props.note.id;
    props.onType(editedNoteID, "description", updatedText);
  };

  const deleteButton = () => {
    props.deleteNote(props.note.id);
  };

  return (
    <li className="note">
      <input
        className="note__title"
        type="text"
        placeholder="Title"
        value={props.note.title}
        onChange={updateTitle}
      />
      <textarea
        className="note__description"
        placeholder="Description..."
        value={props.note.description}
        onChange={updateDescription}
      />
      <span className="note__delete" onClick={deleteButton}>
        X
      </span>
    </li>
  );
};

export default Note;
