import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import NoteList from './components/NoteList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/notes" element={<NoteList />} />
      </Routes>
    </Router>
  );
}

export default App;
