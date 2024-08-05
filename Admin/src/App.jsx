import { BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './Pages/Home.jsx';
import CharacterList from './Pages/CharacterList.jsx';
import AddCharacter from './Pages/AddCharacter.jsx';
import CatagoryList from './Pages/CatagoryList.jsx';
import AddCatagory from './Pages/AddCatagory.jsx';

function App() {

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/characters" element={<CharacterList />} />
            <Route exact path="/characters/add" element={<AddCharacter />} />
            <Route exact path="/characters/edit/:id" element={<AddCharacter />} />
            <Route exact path="/catagories" element={<CatagoryList />} />
            <Route exact path="/catagories/add" element={<AddCatagory />} />
            <Route exact path="/catagories/edit/:id" element={<AddCatagory />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
