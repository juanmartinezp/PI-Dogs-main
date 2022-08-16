import { Route, Routes } from "react-router-dom";
import LandingPage from "./Components/LandingPage.jsx";
import Home from "./Components/Home.jsx";
import Detail from "./Components/DogDetail.jsx";
import CreateDog from "./Components/CreateDog.jsx";
//import About from "../src/Components/About/About"
//import { GlobalStyle } from "./globalStyles";


function App() {
  return (
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dogs/:id" element={<Detail />} />
          <Route path="/create" element={<CreateDog />} />
        </Routes>
      </div>
  );
}

export default App;