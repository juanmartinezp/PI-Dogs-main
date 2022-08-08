import './App.css';

import { Route, Routes } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import Home from "./Components/home";
import DogDetail from "./Components/DogDetail";
import CreateDog from "./Components/CreateDog";
import { GlobalStyle } from "./globalStyles";



function App() {
  return (
    <GlobalStyle>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dogs/:id" element={<DogDetail />} />
        <Route path="/create" element={<CreateDog />} />
      </Routes>
    </GlobalStyle>
  );
}

export default App;