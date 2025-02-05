import React, { useState, useEffect } from 'react';
import { getNotes, createNote, deleteNote } from '../api';

function NoteList() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    async function fetchNotes() {
      const data = await getNotes();
      setNotes(data);
    }
    fetchNotes();
  }, []);

  const handleCreateNote = async () => {
    if (newNote.trim()) {
      const note = await createNote(newNote);
      setNotes([note, ...notes]);
      setNewNote('');
    }
  };

  const startRecording = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech Recognition API is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.start();
    setIsRecording(true);

    recognition.onresult = (event) => {
      setNewNote(event.results[0][0].transcript);
      setIsRecording(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };
  };

  return (
    <div>
        <div className='head'>
            <div>
            <h2>Notes</h2> 
            </div>
            <div className='logout'>
             <button>logout</button>
            </div>

        </div>
    
     
      <div className="note-input">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Enter a note"
        />
        <button onClick={handleCreateNote}>Create Note</button>
        <button onClick={startRecording}>
          {isRecording ? 'Recording...' : 'Record Note'}
        </button>
      </div>
      <div className="note-list">
        {notes.map((note) => (
          <div key={note._id} className="note-card">
            <p>{note.content}</p>
            <button onClick={() => deleteNote(note._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoteList;
