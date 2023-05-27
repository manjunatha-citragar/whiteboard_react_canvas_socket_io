import { toolTypes } from "../../../constants";

export const adjustmentsRequired = (type) => {
  return [toolTypes.RECTANGLE, toolTypes.LINE].includes(type);
};
