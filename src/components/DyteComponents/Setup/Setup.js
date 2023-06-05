import { DyteButton } from "@dytesdk/react-ui-kit";
import { useDyteMeeting } from "@dytesdk/react-web-core";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setIsSessionRecording } from "../../Whiteboard/whiteboardSlice";
import applyDesign from "../utils/applyDesign";

const Setup = () => {
  const { meeting } = useDyteMeeting();
  const buttonEl = useRef(null);
  const dispatch = useDispatch();

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
      <DyteButton
        ref={buttonEl}
        onClick={() => {
          dispatch(setIsSessionRecording(false));
          meeting.joinRoom();
        }}
      >
        Join Room
      </DyteButton>

      <DyteButton
        style={{ marginTop: "10px" }}
        onClick={() => {
          dispatch(setIsSessionRecording(true));
          meeting.joinRoom();
        }}
      >
        Play recorded video
      </DyteButton>
    </div>
  );
};

export default Setup;
