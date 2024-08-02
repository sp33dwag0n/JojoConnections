import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CatagoryList() {
  const navigate = useNavigate();
  const [catagoryList, setCatagoryList] = useState([]);

  async function getCatagoryList() {
    const response = await fetch(`http://localhost:5050/catagory/`);
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      console.error(message);
      return;
    }
    const catagories = await response.json();
    setCatagoryList(catagories);
  }

  useEffect(() => {
    getCatagoryList();
  }, []);

  const editCatagory = (id) => {
    navigate("/catagories/edit/" + id);
  }

  async function deleteCatagory(catagory) {
    if (!window.confirm("Delete the " + catagory.difficulty + " catagory \"" + catagory.name + "\"?")) return;

    try {
      let response = await fetch("http://localhost:5050/catagory/" + catagory._id, {
        method: "DELETE"
      });
    } catch (err) {
      console.error(err);
    }
    getCatagoryList();
  }

    
  return (
    <div className="catagoryList">
        <div>
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/catagories/add")}>Add Catagory</button>
        </div>
        <div>
          <h3>CatagoryList</h3>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Characters</th>
                <th>Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {catagoryList.map((catagory, index) => {
                return (
                  <tr key={index}>
                    <td>{catagory.name}</td>
                    <td>
                      {catagory.characterNames.map((name, key) => {
                        return (
                          <div key={key}>
                            {name}
                            <br />
                          </div>
                        );
                      })}
                    </td>
                    <td>{catagory.difficulty}</td>
                    <td><button onClick={() => editCatagory(catagory._id)}>Edit</button></td>
                    <td><button onClick={() => deleteCatagory(catagory)}>Delete</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default CatagoryList