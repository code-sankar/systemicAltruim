// File: src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/guide" element={<MainPage />} />
        <Route path="/completed" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
