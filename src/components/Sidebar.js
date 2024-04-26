import React from 'react'

function Sidebar({notes , onAddNote , onDeleteNote , activeNote , setActiveNote, handleSearchNote}) {
    const sortedNotes = notes.sort((a,b) => b.lastModified - a.lastModified);

  return (
    <div className='sidebar'>
        <div className='sidebar-header'>
            <h1>Notify</h1>
            <button onClick={onAddNote}>Add</button>
        </div>
        {/* search */}
        <div className='search'>
            <input onChange={(event)=>handleSearchNote(event.target.value)}type='text' id='search-input' placeholder='type to search...'/>
        </div>
        <div className='sidebar-notes'>
            {sortedNotes.map((note) => (
                <div key={note.id} className={`sidebar-note ${note.id === activeNote && 'active'}`} onClick={() => setActiveNote(note.id)}>
                    <div className='sidebar-note-title'>
                        <strong>{note.title}</strong>
                        <button onClick={() => onDeleteNote(note.id)}>Delete</button>
                    </div >

                    <p>{note.body && note.body.substr(0,100)+'...'}</p>

                    <small className='note-info'>Last modified {new Date(note.lastModified).toLocaleDateString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}</small>

                </div>
            ))}
        </div>
    </div>
  )
}

export default Sidebar