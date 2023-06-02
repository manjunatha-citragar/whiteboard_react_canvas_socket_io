import rough from "roughjs/bundled/rough.esm";
import { toolTypes } from "../../../constants";

const generator = rough.generator();

const generatorRectangle = ({ x1, x2, y1, y2 }) => {
  return generator.rectangle(x1, y1, x2 - x1, y2 - y1);
};

const generateLine = ({ x1, x2, y1, y2 }) => {
  return generator.line(x1, y1, x2, y2);
};

export const createElement = ({ x1, x2, y1, y2, toolType, id, text = "" }) => {
  let roughElement;

  if (!toolType) {
    console.warn("Tool type not available while Creating element");
    return;
  }

  switch (toolType) {
    case toolTypes.RECTANGLE:
      roughElement = generatorRectangle({ x1, x2, y1, y2 });
      return {
        id,
        roughElement,
        type: toolType,
        x1,
        y1,
        x2,
        y2,
      };

    case toolTypes.LINE:
      roughElement = generateLine({ x1, x2, y1, y2 });
      return {
        id,
        roughElement,
        type: toolType,
        x1,
        y1,
        x2,
        y2,
      };
    case toolTypes.PENCIL:
      return {
        id,
        type: toolType,
        points: [{ x: x1, y: y1 }],
      };

    case toolTypes.TEXT:
      return {
        id,
        type: toolType,
        x1,
        y1,
        x2,
        y2,
        text: text,
      };

    default:
      throw new Error("Something went wrong while creating element");
  }
};
