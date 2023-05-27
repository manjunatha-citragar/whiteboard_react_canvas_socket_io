import React, { useRef, useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Menu from "./Menu";

import rough from "roughjs/bundled/rough.esm";
import { actions, toolTypes } from "../../constants";
import { v4 as uuid } from "uuid";
import {
  createElement,
  updateElement,
  drawElement,
  adjustmentsRequired,
  adjustElementCoordinates,
} from "./utils";
import { updateElement as updateElementInStore } from "./whiteboardSlice";

let selectedElement;

const setSelectedElement = (el) => {
  selectedElement = el;
};

const Whiteboard = () => {
  const canvasRef = useRef();
  const toolType = useSelector((state) => state.whiteboard.tool);
  const elements = useSelector((state) => state.whiteboard.elements);
  const dispatch = useDispatch();

  const [action, setAction] = useState(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    const roughCanvas = rough.canvas(canvas);

    elements.forEach((element) => {
      drawElement({ element, roughCanvas, context });
    });
  }, [elements]);

  const handleMouseDown = (event) => {
    const { clientX, clientY } = event;

    if (
      toolType === toolTypes.RECTANGLE ||
      toolType === toolTypes.LINE ||
      toolType === toolTypes.PENCIL
    ) {
      setAction(actions.DRAWING);
      const element = createElement({
        x1: clientX,
        y1: clientY,
        x2: clientX,
        y2: clientY,
        id: uuid(),
        toolType,
      });
      setSelectedElement(element);
      dispatch(updateElementInStore(element));
    }
  };

  const handleMouseUP = () => {
    const selectedIndex = elements.findIndex(
      (el) => el.id === selectedElement.id
    );

    if (selectedIndex !== -1 && action === actions.DRAWING) {
      if (adjustmentsRequired(elements[selectedIndex].type)) {
        const { x1, x2, y1, y2 } = adjustElementCoordinates(
          elements[selectedIndex]
        );

        updateElement(
          {
            id: selectedElement.id,
            index: selectedIndex,
            x1,
            x2,
            y1,
            y2,
            type: selectedElement.type,
          },
          elements
        );
      }
    }

    setAction(null);
    setSelectedElement(null);
  };

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;

    if (action === actions.DRAWING) {
      const index = elements.findIndex((ele) => ele.id === selectedElement.id);

      if (index !== -1) {
        updateElement(
          {
            x1: elements[index].x1,
            y1: elements[index].y1,
            x2: clientX,
            y2: clientY,
            id: elements[index].id,
            type: elements[index].type,
            index,
          },
          elements
        );
      }
    }
  };

  return (
    <>
      <Menu />
      <canvas
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUP}
        onMouseMove={handleMouseMove}
        ref={canvasRef}
        height={window.innerHeight}
        width={window.innerWidth}
      />
    </>
  );
};

export default Whiteboard;
