import React, { useEffect } from "react";
import { DyteProvider, useDyteClient } from "@dytesdk/react-web-core";
import { CustomDyteMeeting } from "./components/DyteComponents/CustomDyteMeeting";
import { handleWhiteboardEvents } from "./components/Whiteboard/utils";

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
    }).then((meeting) => {
      handleWhiteboardEvents(meeting);
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
