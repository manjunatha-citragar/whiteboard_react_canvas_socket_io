import {
  DyteAudioVisualizer,
  DyteClock,
  DyteHeader,
  DyteMeetingTitle,
  DyteNameTag,
  DyteParticipantTile,
  DyteRecordingIndicator,
} from "@dytesdk/react-ui-kit";
import { useDyteMeeting } from "@dytesdk/react-web-core";
import React from "react";
import "./style.css";

const MeetingHeader = () => {
  const { meeting } = useDyteMeeting();

  return (
    <>
      <DyteHeader
        style={{
          position: "absolute",
          right: "10px",
          display: "flex",
          justifyContent: "end",
          width: "100%",
        }}
      >
        <DyteRecordingIndicator meeting={meeting} />
        <DyteClock meeting={meeting} />
      </DyteHeader>

      <DyteParticipantTile
        participant={meeting.self}
        nameTagPosition="bottom-center"
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          height: 150,
          width: 250,
        }}
      >
        <DyteNameTag participant={meeting.self}>
          <DyteAudioVisualizer slot="start" />
        </DyteNameTag>
      </DyteParticipantTile>
    </>
  );
};

export default MeetingHeader;
