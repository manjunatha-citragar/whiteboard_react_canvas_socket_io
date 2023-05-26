import React, { useEffect } from "react";
import Whiteboard from "./components/Whiteboard/Whiteboard";
import { connectWithSocketServer } from "./socketConnection/socketConnection";

function App() {
  useEffect(() => {
    connectWithSocketServer();
  }, []);
  return (
    <div className="App">
      <Whiteboard />
    </div>
  );
}

export default App;
