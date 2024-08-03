import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/home.css';

function Home() {
  const navigate = useNavigate();
  
  return (
    <div>
        <div className="header">
          <h3>Home</h3>
        </div>
        <div className="body">
          <button className="btn" onClick={() => navigate("/characters")}>View Characters</button>
          <button className="btn" onClick={() => navigate("/catagories")}>View Catagories</button>
        </div>
    </div>
  )
}

export default Home