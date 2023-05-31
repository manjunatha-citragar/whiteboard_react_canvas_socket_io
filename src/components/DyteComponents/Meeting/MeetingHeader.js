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
      <DyteHeader style={{ width: "100%" }}>
        <div className="dyte-row-flex">
          <DyteMeetingTitle meeting={meeting} />
        </div>
        <DyteRecordingIndicator meeting={meeting} />
        <DyteClock meeting={meeting} />
      </DyteHeader>

      <DyteParticipantTile
        participant={meeting.self}
        nameTagPosition="bottom-center"
      >
        <DyteNameTag participant={meeting.self}>
          <DyteAudioVisualizer slot="start" />
        </DyteNameTag>
      </DyteParticipantTile>
    </>
  );
};

export default MeetingHeader;
