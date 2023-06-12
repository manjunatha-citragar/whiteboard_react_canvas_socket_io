import React from "react";
import { toolTypes } from "../../constants";
import rectangleIcon from "../../resources/icons/rectangle.svg";
import lineIcon from "../../resources/icons/line.svg";
import rubberIcon from "../../resources/icons/rubber.svg";
import pencilIcon from "../../resources/icons/pencil.svg";
import textIcon from "../../resources/icons/text.svg";
import selectionIcon from "../../resources/icons/cursor-selection.svg";
import IconButton from "./IconButton";

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
