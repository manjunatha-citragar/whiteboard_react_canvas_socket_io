import { DyteButton } from "@dytesdk/react-ui-kit";
import { useDyteMeeting } from "@dytesdk/react-web-core";
import React, { useEffect, useRef } from "react";
import applyDesign from "../utils/applyDesign";

const Setup = () => {
  const { meeting } = useDyteMeeting();
  const buttonEl = useRef(null);

  useEffect(() => {
    if (!buttonEl.current) return;
    applyDesign(buttonEl.current);
  }, []);

  if (!meeting) return null;
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p>You haven't joined the room yet.</p>
      <DyteButton ref={buttonEl} onClick={() => meeting.joinRoom()}>
        Join Room
      </DyteButton>
    </div>
  );
};

export default Setup;
