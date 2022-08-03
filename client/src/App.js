import './App.css';

import { Route, Routes } from "react-router-dom";
import LandingPage from "../src/Components/LandingPage";
import Home from "../src/Components/Home";
import Detail from "../src/Components/Detail";
import Creation from "../src/Components/Creation";
import About from "../src/Components/About"
import { GlobalStyle } from "./globalStyles";


function App() {
  return (
    <GlobalStyle>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dogs/:id" element={<Detail />} />
        <Route path="/create" element={<Creation />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </GlobalStyle>
  );
}

export default App;