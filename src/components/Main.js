import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import BasicSyntax from "./BasicSyntax";
import "bootstrap/dist/css/bootstrap.min.css";
import { app, db } from "../firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { ref, get } from "firebase/database";

function Main({ activeNote, onUpdateNote }) {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        console.log("Hello", user);
        const userRef = ref(db, 'users/' + user.uid);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setUsername(userData.username);
        }
      } else {
        setUser(null);
        alert("You are logged out");
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const onEdit = (key, value) => {
    onUpdateNote({
      ...activeNote,
      [key]: value,
      lastModified: Date.now(),
    });
  };

  if (!activeNote)
    return (
      <div className="no-active-note">
        <div className="Login_Logout_button">
          {user ? (
            <div className="text-black me-5">
              Welcome! {username} &nbsp;
              <button
                style={{
                  color: "white",
                  backgroundColor: "#08c",
                  borderRadius: "10px",
                  width: "13vh",
                  height: "35px",
                }}
                onClick={() => signOut(auth)}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className="btn text-white ms-5 me-5"
              id="sign_in_button"
              onClick={() => (window.location.href = "/signup")}
            >
              Signup/Login
            </button>
          )}
        </div>
        <div className="no-active-note-text">No note selected</div>
      </div>
    );

  return (
    <div className="main">
      <div className="main-note-edit">
        <div className="Login_Logout_button">
          {user ? (
            <div className="text-black me-5">
              Welcome! {username} &nbsp;
              <button
                style={{
                  color: "white",
                  backgroundColor: "#08c",
                  borderRadius: "10px",
                  width: "13vh",
                  height: "35px",
                }}
                onClick={() => signOut(auth)}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className="btn text-white ms-5 me-5"
              id="sign_in_button"
              onClick={() => (window.location.href = "/signup")}
            >
              Signup/Login
            </button>
          )}
        </div>
        <input
          type="text"
          id="title"
          value={activeNote.title}
          onChange={(e) => onEdit("title", e.target.value)}
          autoFocus
        />
        <BasicSyntax />
        <textarea
          id="body"
          placeholder="Write your note here..."
          value={activeNote.body}
          onChange={(e) => onEdit("body", e.target.value)}
          rows="10"
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
