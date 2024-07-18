import './App.css'
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './Pages/Home.jsx';
import CharacterList from './Pages/CharacterList.jsx';
import AddCharacter from './Pages/AddCharacter.jsx';

function App() {

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/characters" element={<CharacterList />} />
            <Route exact path="/characters/add" element={<AddCharacter />} />
          </Routes>
        </BrowserRouter>
      </div>
      {/* <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
