import React from "react";
import { useDyteMeeting } from "@dytesdk/react-web-core";
import { setElements, setToolType } from "./whiteboardSlice";
import { useDispatch, useSelector } from "react-redux";
import { whiteboardEvents } from "../../constants";

const IconButton = ({ src, type, isRubber, onClick }) => {
  const dispatch = useDispatch();
  const { meeting } = useDyteMeeting();

  const selectedToolType = useSelector((state) => state?.whiteboard?.tool);

  const handleToolChange = () => {
    if (type) dispatch(setToolType(type));
    if (onClick && typeof onClick === "function") onClick();
  };

  const handleClearBoard = () => {
    dispatch(setElements([]));
    dispatch(setToolType(null));
    meeting.participants.broadcastMessage("ID3Data", {
      id: meeting.self.id,
      type: whiteboardEvents.CLEAR_WHITEBOARD,
    });
  };

  return (
    <button
      className={
        selectedToolType === type ? "menu_button_active" : "menu_button"
      }
      onClick={isRubber ? handleClearBoard : handleToolChange}
    >
      <img src={src} height="80%" width="80%" alt="" />
    </button>
  );
};

export default IconButton;
