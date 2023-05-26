import { toolTypes } from "../../../constants";
import { emitElementUpdate } from "../../../socketConnection/socketConnection";
import store from "../../../store/store";
import { setElements } from "../whiteboardSlice";
import { createElement } from "./createElement";

export const updateElement = (
  { id, x1, x2, y1, y2, type, index },
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

    default:
      throw new Error("Something went wrong when updating element");
  }
};
