import { BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './Pages/AdminHome.jsx';
import CharacterList from './Pages/CharacterList.jsx';
import AddCharacter from './Pages/AddCharacter.jsx';
import CatagoryList from './Pages/CatagoryList.jsx';
import AddCatagory from './Pages/AddCatagory.jsx';
import AdminHome from "./Pages/AdminHome.jsx";
import Puzzle from "./Pages/Puzzle.jsx";

function App() {

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Puzzle />} />
            
            <Route exact path="/admin" element={<AdminHome />} />
            <Route exact path="/admin/characters" element={<CharacterList />} />
            <Route exact path="/admin/characters/add" element={<AddCharacter />} />
            <Route exact path="/admin/characters/edit/:id" element={<AddCharacter />} />
            <Route exact path="/admin/catagories" element={<CatagoryList />} />
            <Route exact path="/admin/catagories/add" element={<AddCatagory />} />
            <Route exact path="/admin/catagories/edit/:id" element={<AddCatagory />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
