import React, { useEffect } from "react";
import { connectWithSocketServer } from "./socketConnection/socketConnection";
import {
  DyteProvider,
  useDyteClient,
  useDyteSelector,
} from "@dytesdk/react-web-core";
import { CustomDyteMeeting } from "./components/DyteComponents/CustomDyteMeeting";

function App() {
  const [meeting, initMeeting] = useDyteClient();

  useEffect(() => {
    const searchParams = new URL(window.location.href).searchParams;

    const authToken = searchParams.get("authToken");

    if (!authToken) {
      alert(
        "An authToken wasn't passed, please pass an authToken in the URL query to join a meeting."
      );
      return;
    }

    initMeeting({
      authToken,
      defaults: {
        audio: false,
        video: false,
      },
    });
  }, [initMeeting]);

  return (
    <div className="App">
      <DyteProvider value={meeting}>
        <CustomDyteMeeting />
      </DyteProvider>
    </div>
  );
}

export default App;
