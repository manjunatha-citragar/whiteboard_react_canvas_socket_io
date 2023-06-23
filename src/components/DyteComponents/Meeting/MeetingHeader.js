import {
  DyteAudioVisualizer,
  DyteClock,
  DyteHeader,
  DyteNameTag,
  DyteParticipantTile,
  DyteRecordingIndicator,
} from "@dytesdk/react-ui-kit";
import { useDyteMeeting } from "@dytesdk/react-web-core";
import React from "react";
import { useSelector } from "react-redux";
import VideoPlayer from "../VideoPlayer/ViedeoPlayer";
import "./style.css";

const MeetingHeader = () => {
  const { meeting } = useDyteMeeting();
  const playRecordedSession = useSelector(
    (state) => state.whiteboard.playRecordedSession
  );

  const videoUrl = "http://localhost:3000/recordings/out.m3u8";

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
      {playRecordedSession ? (
        <VideoPlayer videoUrl={videoUrl} />
      ) : (
        <DyteParticipantTile
          participant={meeting.self}
          nameTagPosition="bottom-center"
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            height: 250,
            width: 250,
          }}
        >
          <DyteNameTag participant={meeting.self}>
            <DyteAudioVisualizer slot="start" />
          </DyteNameTag>
        </DyteParticipantTile>
      )}
    </>
  );
};

export default MeetingHeader;
