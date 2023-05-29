import React, { useEffect } from "react";
import Whiteboard from "./components/Whiteboard/Whiteboard";
import CursorOverlay from "./CursorOverlay/CursorOverlay";
import { connectWithSocketServer } from "./socketConnection/socketConnection";

function App() {
  useEffect(() => {
    connectWithSocketServer();
  }, []);
  return (
    <div className="App">
      <Whiteboard />
      <CursorOverlay />
    </div>
  );
}

export default App;
