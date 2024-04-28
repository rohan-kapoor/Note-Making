import React from "react";
import ReactMarkdown from "react-markdown";
import BasicSyntax from "./BasicSyntax";
import 'bootstrap/dist/css/bootstrap.min.css';

function Main({ activeNote, onUpdateNote }) {
  const onEdit = (key, value) => {
    onUpdateNote({
      ...activeNote,
      [key]: value,
      lastModified: Date.now(),
    });
  };

  if (!activeNote)
    return <div className="no-active-note">No note selected</div>;

  return (
    <div className="main">
      <div className="main-note-edit">
        <input
          type="text"
          id="title"
          value={activeNote.title}
          onChange={(e) => onEdit("title", e.target.value)}
          autoFocus
        />
        <BasicSyntax/>
        <textarea
          id="body"
          placeholder="Write your note here..."
          value={activeNote.body}
          onChange={(e) => onEdit("body", e.target.value)}
        />
      </div>
      <div className="main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <ReactMarkdown className="markdown-preview">
          {activeNote.body}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default Main;
