import { toolTypes } from "../../../constants";

export const drawElement = ({ roughCanvas, element, context }) => {
  switch (element.type) {
    case toolTypes.RECTANGLE:
    case toolTypes.LINE:
      return roughCanvas.draw(element.roughElement);
    default:
      throw new Error("Something went wrong while drawing element");
  }
};
