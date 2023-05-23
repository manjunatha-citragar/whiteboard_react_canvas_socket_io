import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toolTypes } from "../../constants";
import rectangleIcon from "../../resources/icons/rectangle.svg";
import { setToolType } from "./whiteboardSlice";

const IconButton = ({ src, type }) => {
  const dispatch = useDispatch();

  const selectedToolType = useSelector((state) => state?.whiteboard?.tool);

  const handleToolChange = () => {
    dispatch(setToolType(type));
  };

  return (
    <button
      className={
        selectedToolType === type ? "menu_button_active" : "menu_button"
      }
      onClick={handleToolChange}
    >
      <img src={src} height="80%" width="80%" alt="" />
    </button>
  );
};

const Menu = () => {
  return (
    <div className="menu-container">
      <IconButton src={rectangleIcon} type={toolTypes.RECTANGLE} />
    </div>
  );
};

export default Menu;
