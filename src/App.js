import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import AnimeInfo from "./anime";
function App() {
  return (
    <div className="App">
      <h1>More Anime</h1>
      <AnimeInfo />
    </div>
  );
}

export default App;
