import React, { useEffect, useRef } from "react";
import {
  DyteAudioVisualizer,
  DyteCameraToggle,
  DyteClock,
  DyteControlbar,
  DyteHeader,
  DyteLeaveButton,
  DyteMeetingTitle,
  DyteMicToggle,
  DyteNameTag,
  DyteParticipantTile,
  DyteRecordingIndicator,
  DyteRecordingToggle,
} from "@dytesdk/react-ui-kit";
import { useDyteMeeting } from "@dytesdk/react-web-core";
import applyDesign from "../utils/applyDesign";
import "./style.css";
import MeetingHeader from "./MeetingHeader";
import MeetingFooter from "./MeetingFooter";

const Meeting = () => {
  const { meeting } = useDyteMeeting();
  const mainEl = useRef(null);

  useEffect(() => {
    if (!mainEl.current) return;
    applyDesign(mainEl.current);
  }, [mainEl]);

  return (
    <div className="meeting-container" ref={mainEl}>
      <MeetingHeader />
        
      <MeetingFooter />
    </div>
  );
};

export default Meeting;
