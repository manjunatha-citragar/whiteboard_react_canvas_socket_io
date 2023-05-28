import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toolTypes } from "../../constants";
import rectangleIcon from "../../resources/icons/rectangle.svg";
import lineIcon from "../../resources/icons/line.svg";
import rubberIcon from "../../resources/icons/rubber.svg";
import pencilIcon from "../../resources/icons/pencil.svg";
import textIcon from "../../resources/icons/text.svg";
import selectionIcon from "../../resources/icons/cursor-selection.svg";
import { setElements, setToolType } from "./whiteboardSlice";
import { clearWhiteboard } from "../../socketConnection/socketConnection";

const IconButton = ({ src, type, isRubber }) => {
  const dispatch = useDispatch();

  const selectedToolType = useSelector((state) => state?.whiteboard?.tool);

  const handleToolChange = () => {
    dispatch(setToolType(type));
  };

  const handleClearBoard = () => {
    dispatch(setElements([]));
    dispatch(setToolType(null));
    clearWhiteboard();
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

const Menu = () => {
  return (
    <div className="menu-container">
      <IconButton src={rectangleIcon} type={toolTypes.RECTANGLE} />
      <IconButton src={lineIcon} type={toolTypes.LINE} />
      <IconButton src={rubberIcon} type={toolTypes.RUBBER} isRubber />
      <IconButton src={pencilIcon} type={toolTypes.PENCIL} />
      <IconButton src={textIcon} type={toolTypes.TEXT} />
      <IconButton src={selectionIcon} type={toolTypes.SELECTION} />
    </div>
  );
};

export default Menu;
