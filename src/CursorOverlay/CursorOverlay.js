import React from "react";
import { useSelector } from "react-redux";

import cursorIcon from "../resources/icons/cursor-selection.svg";

const CursorOverlay = () => {
  const cursors = useSelector((state) => state.cursor.cursors);
  return (
    <>
      {cursors.map((c) => {
        return (
          <img
            key={c.userid}
            className="cursor"
            src={cursorIcon}
            alt="cursor"
            style={{ position: "absolute", left: c.x, top: c.y, width: "30px" }}
          />
        );
      })}
    </>
  );
};

export default CursorOverlay;
