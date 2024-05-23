import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import ArtistSearch from './components/ArtistSearch';
import Modal from 'react-modal';

// Initialize Modal
Modal.setAppElement('#root');

function App() {
  return (
    <div className="App">
      <ArtistSearch />
    </div>
  );
}

export default App;
