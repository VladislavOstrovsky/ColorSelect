import React from 'react';
import './App.css';
import ColorSelect from "./components/ColorSelect"

function App() {
  return (
    <div className="App">
      <ColorSelect value="d4ff00" onChange={(value) => console.log(value)} />
    </div>
  );
}

export default App;
