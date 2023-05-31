import {
  DyteCameraToggle,
  DyteControlbar,
  DyteLeaveButton,
  DyteMicToggle,
  DyteRecordingToggle,
} from "@dytesdk/react-ui-kit";
import { useDyteMeeting } from "@dytesdk/react-web-core";
import React from "react";
import "./style.css";

const MeetingFooter = () => {
  const { meeting } = useDyteMeeting();

  return (
    <>
      <DyteControlbar style={{ width: "100%" }}>
        <div className="dyte-row-flex">
          <DyteMicToggle meeting={meeting} />
          <DyteCameraToggle meeting={meeting} />
          <DyteRecordingToggle meeting={meeting} size="sm" />
          <DyteLeaveButton />
        </div>
      </DyteControlbar>
    </>
  );
};

export default MeetingFooter;
