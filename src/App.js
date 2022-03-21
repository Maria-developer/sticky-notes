import React, { Component } from "react";
import Header from "./Header.js";
import NotesList from "./NotesList.js";

class App extends Component {
  state = {
    notes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true
      }
    ],
    searchText: ""
  };

  addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };
    this.setState({ notes: [newNote, ...this.state.notes] });
  };

  onType = (editedNoteID, updatedField, updatedText) => {
    const updatedNotes = this.state.notes.map((note) => {
      if (note.id !== editedNoteID) {
        return note;
      } else {
        if (updatedField === "title") {
          note.title = updatedText;
          return note;
        } else {
          note.description = updatedText;
          return note;
        }
      }
    });
    this.setState({ notes: updatedNotes });
  };

  onSearch = (text) => {
    const newSearchText = text.toLowerCase();
    const notesMatchingSearch = this.state.notes.map((note) => {
      if (!newSearchText) {
        note.doesMatchSearch = true;
        return note;
      } else {
        const title = note.title.toLowerCase();
        const description = note.description.toLowerCase();
        const titleMatch = title.includes(newSearchText);
        const descriptionMatch = description.includes(newSearchText);
        const match = titleMatch || descriptionMatch;
        note.doesMatchSearch = match;
        return note;
      }
    });
    this.setState({
      searchText: newSearchText,
      notes: notesMatchingSearch
    });
  };

  deleteNote = (noteID) => {
    const showNotesThatWereNotDeleted = this.state.notes.filter(
      (note) => note.id !== noteID
    );
    this.setState({ notes: showNotesThatWereNotDeleted });
  };

  componentDidUpdate() {
    const stringifiedNotes = JSON.stringify(this.state.notes);
    localStorage.setItem("savedNotes", stringifiedNotes);
  }

  componentDidMount() {
    const stringifiedNotes = localStorage.getItem("savedNotes");
    if (stringifiedNotes) {
      const savedNotes = JSON.parse(stringifiedNotes);
      this.setState({ notes: savedNotes });
    }
  }

  render() {
    return (
      <div>
        <Header
          searchText={this.state.searchText}
          addNote={this.addNote}
          onSearch={this.onSearch}
        />
        <NotesList
          notes={this.state.notes}
          onType={this.onType}
          deleteNote={this.deleteNote}
        />
      </div>
    );
  }
}

export default App;
