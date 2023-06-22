import { whiteboardEvents } from "../../../constants";
import { updateCursorPosition } from "../../../CursorOverlay/cursorSlice";
import store from "../../../store/store";
import { setElements, setToolType, updateElement } from "../whiteboardSlice";
import { deserializeData } from "./deserializeData";

export const updateLocalStore = (payload) => {
  if (payload.type === whiteboardEvents.UPDATE_ELEMENT) {
    const data = deserializeData(payload);
    store.dispatch(updateElement(data.data ? data.data : data));
  } else if (payload.type === whiteboardEvents.UPDATE_CURSOR_POSITION) {
    store.dispatch(updateCursorPosition(payload.data));
  } else if (payload.type === whiteboardEvents.CLEAR_WHITEBOARD) {
    store.dispatch(setElements([]));
    store.dispatch(setToolType(null));
  }
};
