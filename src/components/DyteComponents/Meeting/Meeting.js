import React, { useEffect, useRef } from "react";
import applyDesign from "../utils/applyDesign";
import "./style.css";
import MeetingHeader from "./MeetingHeader";
import MeetingFooter from "./MeetingFooter";
import Whiteboard from "../../Whiteboard/Whiteboard";
import CursorOverlay from "../../../CursorOverlay/CursorOverlay";
import { connectWithSocketServer } from "../../../socketConnection/socketConnection";

const Meeting = () => {
  const mainEl = useRef(null);

  useEffect(() => {
    connectWithSocketServer();
  }, []);

  useEffect(() => {
    if (!mainEl.current) return;
    applyDesign(mainEl.current);
  }, [mainEl]);

  return (
    <div className="meeting-container" ref={mainEl}>
      <MeetingHeader />
      <Whiteboard />
      <CursorOverlay />
      <MeetingFooter />
    </div>
  );
};

export default Meeting;
