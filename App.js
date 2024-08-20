import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import Translate from "./components/Translate";
import SavedTranslations from "./SavedTranslations";
// import NavBar from "./compon/NavBar"; // Ensure this path is correct
import NavBar from './components/navbar';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Translate />} />
        <Route path="/saved-translations" element={<SavedTranslations />} />
      </Routes>
    </Router>
  );
}

export default App;
