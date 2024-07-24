import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate();
  
  return (
    <div>
        <h3>Home</h3>
        <br />
        <button onClick={() => navigate("/characters")}>Character List</button>
        <button onClick={() => navigate("/catagories")}>Catagory List</button>
    </div>
  )
}

export default Home