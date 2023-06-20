import React, { useEffect } from "react";
import { DyteProvider, useDyteClient } from "@dytesdk/react-web-core";
import { CustomDyteMeeting } from "./components/DyteComponents/CustomDyteMeeting";
import { handleWhiteboardEvents } from "./components/Whiteboard/utils";

function App() {
  const [meeting, initMeeting] = useDyteClient();

  useEffect(() => {
    const searchParams = new URL(window.location.href).searchParams;

    const authToken =
      searchParams.get("authToken") ||
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdJZCI6ImExNjhmM2MyLTcwMmMtNDFlZC1iYmI0LTcxOGUxYTZkNzExOSIsIm1lZXRpbmdJZCI6ImJiYjg3MzZjLWI2NGQtNDkyNy1iYzRlLTk2OTQ5NTM1ZDkxMiIsInBhcnRpY2lwYW50SWQiOiJhYWEyMGRiMC1iZmQ0LTRmYTktYWNiNy05NWM0NjAxOGUzYzgiLCJwcmVzZXRJZCI6ImI1Y2UwZDJkLTdjNWMtNDhhOC1hZmViLThkZGFiYjY5ODAzNSIsImlhdCI6MTY4NjU0NDE0NywiZXhwIjoxNjk1MTg0MTQ3fQ.QuI0y3tbjWwGAdS9M4e3soAUA3NJgBKqhCT8E2pKDVEV-Fnmwti-YCOFxEvk6TzZsWKZKUk9LQw-RjGA3yQkQbLJp7yNWZLEHytqQXirVC7XSCy4_VDxng_oQw8dU9Nq6OmbnaAScK888qAJ22DkaKrBVPy43Si_UGYr7-vidq8iY9CYDlDGwh9n2-56WlT3oUcHzLgPwvZxFliZ7Ucquf-Kq2gPoVQRB5rFfkDmXznoOTxkaU9diUKPNdloSz3ysa0vMepKLz0OslpYabqOhy5HBlWakO7wzPtLMEpmvaW6wvcrboLyv1dcLvf1Bn9PtOaWE82-tZcAC4TZdRqf9Q";

    if (!authToken) {
      console.warn(
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
