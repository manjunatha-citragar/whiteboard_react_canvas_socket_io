import { toolTypes } from "../../../constants";

import { getStroke } from "perfect-freehand";
import { getSvgPathFromStroke } from ".";

const drawPencilElement = (element, context) => {
  const myStroke = getStroke(element.points, {
    size: 10,
  });

  const pathData = getSvgPathFromStroke(myStroke);

  const myPath = new Path2D(pathData);
  context.fill(myPath);
};

const drawTextElement = (element, context) => {
  context.texBaseline = "top";
  context.font = "24px sans-serif";
  context.fillText(element.text, element.x1, element.y1);
};

export const drawElement = ({ roughCanvas, element, context }) => {
  switch (element.type) {
    case toolTypes.RECTANGLE:
    case toolTypes.LINE:
      return roughCanvas.draw(element.roughElement);
    case toolTypes.PENCIL:
      drawPencilElement(element, context);
      break;
    case toolTypes.TEXT:
      drawTextElement(element, context);
      break;
    default:
      throw new Error("Something went wrong while drawing element");
  }
};
