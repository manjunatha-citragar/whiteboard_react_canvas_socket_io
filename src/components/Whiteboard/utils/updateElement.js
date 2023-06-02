import { toolTypes, whiteboardEvents } from "../../../constants";
import store from "../../../store/store";
import { setElements } from "../whiteboardSlice";
import { createElement } from "./createElement";

export const updatePencilElementWhenMoving = (
  { index, newPoints },
  elements,
  meeting
) => {
  const elementsCopy = [...elements];

  elementsCopy[index] = {
    ...elementsCopy[index],
    points: newPoints,
  };

  const updatedPencilElement = elementsCopy[index];

  store.dispatch(setElements(elementsCopy));
  meeting.participants.broadcastMessage("ID3", {
    data: updatedPencilElement,
    type: whiteboardEvents.UPDATE_ELEMENT,
    id: meeting.self.id,
  });
};

export const updateElement = (
  { id, x1, x2, y1, y2, type, text = "", index },
  elements,
  meeting
) => {
  const elementsCopy = [...elements];

  if (!type) {
    console.warn("Tool type not available while Updating element");
    return;
  }

  switch (type) {
    case toolTypes.RECTANGLE:
    case toolTypes.LINE:
      const updatedElement = createElement({
        x1,
        x2,
        y1,
        y2,
        id,
        toolType: type,
      });

      elementsCopy[index] = updatedElement;
      store.dispatch(setElements(elementsCopy));
      meeting.participants.broadcastMessage("ID3", {
        data: updatedElement,
        id: meeting.self.id,
        type: whiteboardEvents.UPDATE_ELEMENT,
      });

      break;
    case toolTypes.PENCIL:
      elementsCopy[index] = {
        ...elementsCopy[index],
        points: [
          ...elementsCopy[index].points,
          {
            x: x2,
            y: y2,
          },
        ],
      };

      const updatdElementCopy = elementsCopy[index];
      store.dispatch(setElements(elementsCopy));
      meeting.participants.broadcastMessage("ID3", {
        data: updatdElementCopy,
        type: whiteboardEvents.UPDATE_ELEMENT,
        id: meeting.self.id,
      });
      break;

    case toolTypes.TEXT:
      const textWidth = document
        .getElementById("canvas")
        .getContext("2d")
        .measureText(text).width;

      const textHeight = 5;

      elementsCopy[index] = {
        ...createElement({
          id,
          x1,
          y1,
          x2: x1 + textWidth,
          y2: y1 + textHeight,
          toolType: type,
          text,
        }),
      };

      const updatedTextElement = elementsCopy[index];
      store.dispatch(setElements(elementsCopy));

      meeting.participants.broadcastMessage("ID3", {
        data: updatedTextElement,
        type: whiteboardEvents.UPDATE_ELEMENT,
        id: meeting.self.id,
      });
      break;
    default:
      throw new Error("Something went wrong when updating element");
  }
};
