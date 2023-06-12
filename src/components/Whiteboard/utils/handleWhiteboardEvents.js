import { whiteboardEvents } from "../../../constants";
import { updateCursorPosition } from "../../../CursorOverlay/cursorSlice";
import store from "../../../store/store";
import { setElements, setToolType, updateElement } from "../whiteboardSlice";

export const handleWhiteboardEvents = (meeting) => {
  meeting.participants.on("broadcastedMessage", ({ _, payload }) => {
    if (
      payload?.id !== meeting.self.id &&
      payload.type === whiteboardEvents.UPDATE_ELEMENT
    ) {
      store.dispatch(updateElement(payload.data));
    } else if (
      payload?.id !== meeting.self.id &&
      payload.type === whiteboardEvents.UPDATE_CURSOR_POSITION
    ) {
      store.dispatch(updateCursorPosition(payload.data));
    } else if (
      payload?.id !== meeting.self.id &&
      payload.type === whiteboardEvents.CLEAR_WHITEBOARD
    ) {
      store.dispatch(setElements([]));
      store.dispatch(setToolType(null));
    }
  });
};
