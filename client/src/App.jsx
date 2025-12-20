import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ImagePuzzle from "./pages/Level1.jsx";
import Level2GuessWhoSaidIt from "./pages/Level2.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ImagePuzzle />} />
        <Route path="/level2" element={<Level2GuessWhoSaidIt />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
