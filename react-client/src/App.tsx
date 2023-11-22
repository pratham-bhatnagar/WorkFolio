import React from "react";
import { Link, Route } from "wouter";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div>
        <Route path="/">
          <Home />
        </Route>
      </div>
    </div>
  );
}

export default App;
