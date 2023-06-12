import React, { useRef, useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Menu from "./Menu";

import rough from "roughjs/bundled/rough.esm";
import {
  actions,
  cursorPositions,
  toolTypes,
  whiteboardEvents,
} from "../../constants";
import { v4 as uuid } from "uuid";
import {
  createElement,
  updateElement,
  drawElement,
  adjustmentsRequired,
  adjustElementCoordinates,
  getElementAtPosition,
  getCursorForPosition,
  getResizedCoordinates,
  updatePencilElementWhenMoving,
} from "./utils";
import { updateElement as updateElementInStore } from "./whiteboardSlice";
import { useDyteMeeting } from "@dytesdk/react-web-core";

let emitCursor = true;
let lastCursorPosition;

const Whiteboard = () => {
  const canvasRef = useRef();
  const textAreaRef = useRef();
  const toolType = useSelector((state) => state.whiteboard.tool);
  const elements = useSelector((state) => state.whiteboard.elements);
  const dispatch = useDispatch();
  const { meeting } = useDyteMeeting();

  const [action, setAction] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    const roughCanvas = rough.canvas(canvas);

    elements.forEach((element) => {
      drawElement({ element, roughCanvas, context });
    });
  }, [elements]);

  const emitCursorPosition = (cursorData, meeting) => {
    meeting.participants.broadcastMessage("ID3Data", {
      data: cursorData,
      id: meeting.self.id,
      type: whiteboardEvents.UPDATE_CURSOR_POSITION,
    });
  };

  const handleTextAreaBlur = (event) => {
    const { id, x1, y1, type } = selectedElement;

    const index = elements.findIndex((el) => el.id === id);

    if (index !== -1) {
      updateElement(
        { id, x1, y1, type, text: event?.target?.value, index },
        elements,
        meeting
      );
      setAction(null);
      setSelectedElement(null);
    }
  };

  const handleMouseDown = (event) => {
    const { clientX, clientY } = event;

    let element;

    if (selectedElement && action === actions.WRITING) {
      return;
    }

    if (!toolType) {
      console.warn("Tool type not selected from Tools menu!!");
      return;
    }

    switch (toolType) {
      case toolTypes.RECTANGLE:
      case toolTypes.LINE:
      case toolTypes.PENCIL:
        element = createElement({
          x1: clientX,
          y1: clientY,
          x2: clientX,
          y2: clientY,
          id: uuid(),
          toolType,
        });

        setAction(actions.DRAWING);
        setSelectedElement(element);
        dispatch(updateElementInStore(element));

        break;
      case toolTypes.TEXT:
        element = createElement({
          x1: clientX,
          y1: clientY,
          x2: clientX,
          y2: clientY,
          id: uuid(),
          toolType,
        });

        setAction(actions.WRITING);
        setSelectedElement(element);
        dispatch(updateElementInStore(element));

        break;

      case toolTypes.SELECTION:
        element = getElementAtPosition(clientX, clientY, elements);

        if (
          element &&
          (element.type === toolTypes.RECTANGLE ||
            element.type === toolTypes.TEXT ||
            element.type === toolTypes.LINE)
        ) {
          setAction(
            element.position === cursorPositions.INSIDE
              ? actions.MOVING
              : actions.RESIZING
          );

          const offsetX = clientX - element.x1;
          const offsetY = clientY - element.y1;

          setSelectedElement({ ...element, offsetX, offsetY });
        }

        if (element && element.type === toolTypes.PENCIL) {
          setAction(actions.MOVING);

          const xOffsets = element.points.map((point) => clientX - point.x);
          const yOffsets = element.points.map((point) => clientY - point.y);

          setSelectedElement({ ...element, xOffsets, yOffsets });
        }

        break;
      default:
        throw new Error("Something went wrong, tool type not selected");
    }
  };

  const handleMouseUP = () => {
    const selectedIndex = elements.findIndex(
      (el) => el.id === selectedElement?.id
    );

    if (selectedIndex !== -1) {
      if (action === actions.DRAWING || action === actions.RESIZING) {
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
            elements,
            meeting
          );
        }
      }
    }

    setAction(null);
    setSelectedElement(null);
  };

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;

    lastCursorPosition = { x: clientX, y: clientY };

    if (emitCursor) {
      emitCursorPosition({ x: clientX, y: clientY }, meeting);
      emitCursor = false;

      setTimeout(() => {
        emitCursor = true;
        emitCursorPosition(lastCursorPosition, meeting);
      }, 50);
    }

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
          elements,
          meeting
        );
      }
    }

    if (toolType === toolTypes.SELECTION) {
      const element = getElementAtPosition(clientX, clientY, elements);

      event.target.style.cursor = element
        ? getCursorForPosition(element.position)
        : "default";
    }

    if (
      selectedElement &&
      toolType === toolTypes.SELECTION &&
      action === actions.MOVING &&
      selectedElement.type === toolTypes.PENCIL
    ) {
      const newPoints = selectedElement.points.map((_, index) => ({
        x: clientX - selectedElement.xOffsets[index],
        y: clientY - selectedElement.yOffsets[index],
      }));

      const index = elements.findIndex((el) => el.id === selectedElement.id);

      if (index !== -1) {
        updatePencilElementWhenMoving({ index, newPoints }, elements, meeting);
      }

      return;
    }

    if (
      toolType === toolTypes.SELECTION &&
      action === actions.MOVING &&
      selectedElement
    ) {
      const { id, x1, x2, y1, y2, type, offsetX, offsetY, text } =
        selectedElement;

      const width = x2 - x1;
      const height = y2 - y1;

      const newX1 = clientX - offsetX;
      const newY1 = clientY - offsetY;

      const index = elements.findIndex((el) => el.id === selectedElement.id);

      if (index !== -1) {
        updateElement(
          {
            id,
            x1: newX1,
            y1: newY1,
            x2: newX1 + width,
            y2: newY1 + height,
            type,
            index,
            text,
          },
          elements,
          meeting
        );
      }
    }

    if (
      toolType === toolTypes.SELECTION &&
      action === actions.RESIZING &&
      selectedElement
    ) {
      const { id, type, position, ...cooridinates } = selectedElement;

      const { x1, y1, x2, y2 } = getResizedCoordinates(
        clientX,
        clientY,
        position,
        cooridinates
      );

      const index = elements.findIndex((el) => el.id === selectedElement.id);

      if (index !== -1) {
        updateElement(
          {
            id,
            x1,
            y1,
            x2,
            y2,
            type,
            index,
          },
          elements,
          meeting
        );
      }
    }
  };

  return (
    <>
      <Menu />
      {action === actions.WRITING ? (
        <textarea
          ref={textAreaRef}
          onBlur={handleTextAreaBlur}
          style={{
            position: "absolute",
            top: selectedElement.y1,
            left: selectedElement.x1,
            font: "24px sans-serif",
            margin: 0,
            padding: 0,
            outline: 0,
            resize: "auto",
            overflow: "hidden",
            whiteSpace: "pre",
            background: "transparent",
            border: 0,
          }}
        />
      ) : null}
      <canvas
        id="canvas"
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
