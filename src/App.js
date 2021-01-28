import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "./components/Loader";

function App() {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.postId.value);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" name="postId" />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}

export default App;
