import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AddCharacter() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    part: ""
  })

  async function handleSubmit(e) {
    e.preventDefault();

    if (!window.confirm("Add " + form.name + " from Part " + form.part + "?")) return;
    
    const person = { ...form };
    try {
      let response = await fetch("http://localhost:5050/character", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });
    } catch (err) {
      console.error(err);
    }

    navigate("/characters/");
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
        <button onClick={() => navigate("/characters/")}>
          List
        </button>
      </div>
      <div>
        AddCharacter
      </div>
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required/>
        <br />

        <label>Part: </label>
        <select name="part" onChange={handleChange} required>
          <option value="">Select Part</option>
          <option value="1">Part 1</option>
          <option value="2">Part 2</option>
          <option value="3">Part 3</option>
          <option value="4">Part 4</option>
          <option value="5">Part 5</option>
          <option value="6">Part 6</option>
          <option value="7">Part 7</option>
          <option value="8">Part 8</option>
          <option value="9">Part 9</option>
        </select>
        <br />
        
        <button type="submit" >Submit</button>
      </form>
    </div>
  )
}

export default AddCharacter