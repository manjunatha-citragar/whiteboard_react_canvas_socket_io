import { toolTypes } from "../../../constants";
import { emitElementUpdate } from "../../../socketConnection/socketConnection";
import store from "../../../store/store";
import { setElements } from "../whiteboardSlice";
import { createElement } from "./createElement";

export const updateElement = (
  { id, x1, x2, y1, y2, type, text = "", index },
  elements
) => {
  const elementsCopy = [...elements];

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
      emitElementUpdate(updatedElement);

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
      emitElementUpdate(updatdElementCopy);

      break;

    case toolTypes.TEXT:
      // const textWidth = document
      //   .getElementById("canvas")
      //   .getContext("2d")
      //   .measureText(text).width;

      const textHeight = 17;

      elementsCopy[index] = {
        ...createElement({
          id,
          x1: x1,
          y1: y1 + textHeight,
          toolType: type,
          text,
        }),
      };

      const updatedTextElement = elementsCopy[index];
      store.dispatch(setElements(elementsCopy));

      emitElementUpdate(updatedTextElement);
      break;
    default:
      throw new Error("Something went wrong when updating element");
  }
};
