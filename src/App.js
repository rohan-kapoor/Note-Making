import { useEffect, useState } from 'react';
import { ref, set, push, remove, onValue, update } from 'firebase/database';
import { db, auth } from './firebase';
import './App.css';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import SignupLogin from "./SignupLogin";
import { Route, Routes, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log('User logged in:', currentUser);
        setUser(currentUser);
        fetchNotes(currentUser.uid);
      } else {
        console.log('No user logged in');
        setUser(null);
        setNotes([]);
        navigate('/signup');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchNotes = (uid) => {
    const notesRef = ref(db, `notes/${uid}`);
    onValue(notesRef, (snapshot) => {
      const data = snapshot.val();
      const notesArray = data ? Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      })) : [];
      setNotes(notesArray);
    });
  };

  const onAddNote = async () => {
    if (!user) return;

    const newNote = {
      title: 'Untitled Note',
      body: '',
      lastModified: Date.now(),
    };

    const newNoteRef = push(ref(db, `notes/${user.uid}`));
    await set(newNoteRef, newNote);
    setActiveNote(newNoteRef.key);
  };

  const onDeleteNote = async (idToDelete) => {
    if (!user) return;

    const noteRef = ref(db, `notes/${user.uid}/${idToDelete}`);
    await remove(noteRef);
  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  const onUpdateNote = async (updatedNote) => {
    if (!user) return;

    const noteRef = ref(db, `notes/${user.uid}/${activeNote}`);
    await update(noteRef, updatedNote);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <>
                <Sidebar
                  notes={notes.filter(
                    (note) =>
                      note.title.toLowerCase().includes(searchText.toLowerCase()) ||
                      new Date(note.lastModified).toLocaleString().toLowerCase().includes(searchText.toLowerCase())
                  )}
                  onAddNote={onAddNote}
                  onDeleteNote={onDeleteNote}
                  activeNote={activeNote}
                  setActiveNote={setActiveNote}
                  handleSearchNote={setSearchText}
                />
                <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
              </>
            ) : (
              <SignupLogin />
            )
          }
        />
        <Route path="/signup" element={<SignupLogin />} />
      </Routes>
    </div>
  );
}

export default App;
