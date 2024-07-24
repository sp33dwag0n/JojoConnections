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

  const editCharacter = (id) => {
    navigate("/characters/edit/" + id);
  }

  async function deleteCharacter(character) {
    if (!window.confirm("Delete " + character.name + " from Part " + character.part + "?")) return;

    try {
      let response = await fetch("http://localhost:5050/character/" + character._id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      });
    } catch (err) {
      console.error(err);
    }
    window.location.reload();
  }
  
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
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>id</th>
                <th>Part</th>
              </tr>
            </thead>
            <tbody>
              {characterList.map((character, index) => {
                return (
                  <tr key={index}>
                    <td>{character.name}</td>
                    <td>{character._id}</td>
                    <td>{character.part}</td>
                    <td><div><a onClick={() => editCharacter(character._id)}>Edit</a></div></td>
                    <td><div><a onClick={() => deleteCharacter(character)}>Delete</a></div></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default CharacterList