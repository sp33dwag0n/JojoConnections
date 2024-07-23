import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function CharacterList() {
  const navigate = useNavigate();
  const [characterList, setCharacterList] = useState([]);

  // This method fetches the records from the database.
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
  }, [characterList.length]);
  
  return (
    <div>
        <div>
          <button onClick={() => navigate("/characters/add")}>
            Add
          </button>
        </div>
        <div>
          <h3>CharacterList</h3>
        </div>
        <div>
          {characterList.map((character, index) => (
            <div key={index}>
              <p>{character._id}: {character.name} - Part {character.part}</p>
            </div>
          ))}
        </div>
    </div>
  )
}

export default CharacterList