import React, { useState, useEffect } from 'react';
import '../Styles/modal.css';

function CharactersModal({ open, onClose, selectedCharacters }) {

  if (!open) return null;

  const [characterList, setCharacterList] = useState([]);

  async function getCharacterList() {
    const response = await fetch(`http://localhost:5050/character/`);
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      console.error(message);
      return;
    }
    const characters = await response.json();
    setCharacterList(characters);
  }

  useEffect(() => {
    getCharacterList();
  }, []);

  return (
    <div className="modal-background">
        <div className="modal-container">
            Hello
            <button onClick={onClose}>Back</button>
            <button onClick={onClose}>Submit</button>
            {selectedCharacters}
        </div>
    </div>
  )
}

export default CharactersModal