import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function AddCatagory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    characters: [],
    difficulty: "",
  })

  useEffect(() => {
    if (id) {
      getCatagory(id);
    }
  }, []);

  async function getCatagory(id) {
    const response = await fetch(`http://localhost:5050/catagory/` + id);
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      console.error(message);
      return;
    }
    const catagory = await response.json();
    document.getElementById("name").value = catagory.name;
    // document.getElementById("characters").value = catagory.characters;
    document.getElementById("difficulty").value = catagory.difficulty;
    setForm({name: catagory.name, characters: catagory.characters, difficulty: catagory.difficulty});
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    const person = { ...form };

    if (id) {
      try {
        let response = await fetch("http://localhost:5050/catagory/" + id, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        let response = await fetch("http://localhost:5050/catagory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      } catch (err) {
        console.error(err);
      }
    }

    navigate("/catagories/");
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  
  return (
    <div>
      <div>
        <button onClick={() => navigate("/catagories/")}>
          Catagory List
        </button>
      </div>
      <div>
        <h3>AddCharacter</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input type="text" name="name" id="name" placeholder="Name" onChange={handleChange} required/>
        <br />

        <label>Difficulty: </label>
        <select name="difficulty" id="difficulty" onChange={handleChange} required>
          <option value="">Select Difficulty</option>
          <option value="1">Easy</option>
          <option value="2">Medium</option>
          <option value="3">Hard</option>
          <option value="4">Extreme</option>
        </select>
        <br />
        
        <button type="submit" >Submit</button>
      </form>
    </div>
  )
}

export default AddCatagory