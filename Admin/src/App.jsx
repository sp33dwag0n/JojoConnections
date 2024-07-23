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
    </>
  )
}

export default App
