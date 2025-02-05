import React, { useState } from 'react';

function NoteModal({ note, onClose, onUpdate }) {
  const [content, setContent] = useState(note.content);

  const handleUpdate = () => {
    onUpdate(note._id, content);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleUpdate}>Update</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default NoteModal;
