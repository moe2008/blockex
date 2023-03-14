import React from "react";
import "./App.css";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AccountPage from "./AccountPage";
import Home from "./Home";


function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          Component={Home}
        />
        <Route path="/acc" Component={AccountPage} />
      </Routes>
    </Router>
  );
}

export default App;
