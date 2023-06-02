import {
  DyteCameraToggle,
  DyteControlbar,
  DyteLeaveButton,
  DyteMicToggle,
} from "@dytesdk/react-ui-kit";
import { useDyteMeeting } from "@dytesdk/react-web-core";
import React, { useState } from "react";
import IconButton from "../../Whiteboard/IconButton";
import "./style.css";
import recordIcon from "../../../resources/icons/record.svg";
import { startRecording, stopRecording } from "../utils";

const MeetingFooter = () => {
  const { meeting } = useDyteMeeting();
  const [recording, setRecording] = useState(false);
  const [recordingId, setRecordingId] = useState();

  const searchParams = new URL(window.location.href).searchParams;

  const meetingId = searchParams.get("meetingId");

  const handleRecord = () => {
    if (!recording) {
      startRecording({ meetingId, setRecordingId, setRecording });
    } else {
      stopRecording({ recordingId, setRecording });
    }
  };

  return (
    <>
      <DyteControlbar
        style={{ position: "absolute", bottom: "10px", width: "100%" }}
      >
        <div className="dyte-row-flex">
          <DyteMicToggle meeting={meeting} />
          <DyteCameraToggle meeting={meeting} />
          <IconButton src={recordIcon} onClick={handleRecord} />
          <span>{recording ? "Stop Recording" : "Start Recording"}</span>
          <DyteLeaveButton size="sm" meeting={meeting} />
        </div>
      </DyteControlbar>
    </>
  );
};

export default MeetingFooter;
