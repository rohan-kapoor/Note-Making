import {useEffect, useState} from 'react'
import uuid from 'react-uuid'
import './App.css';
import Main from './components/Main';
import Sidebar from './components/Sidebar'

function App() {
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );

  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
    localStorage.setItem('notes',JSON.stringify(notes));
  }, [notes])

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now()
    };

    setNotes([newNote, ...notes]);
  }

  const onDeleteNote = (idToDelete) => {
    setNotes(notes.filter((note) => note.id !== idToDelete));
  }

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  }
  //search
  const [searchText, setSearchText] = useState('');

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note) => {
      if(note.id === activeNote){
        return updatedNote;
      }
      return note;
    });
    setNotes(updatedNotesArray);
  }

  return (
    <div className="App">
      <Sidebar
        /*search*/
        notes={notes.filter((note) => 
        note.title.toLowerCase().includes(searchText)
      )}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
        handleSearchNote={setSearchText}
      />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote}/>
    </div>
  );
}

export default App;
