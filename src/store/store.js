import { configureStore } from "@reduxjs/toolkit";

import whiteboardSliceReducer from "../components/Whiteboard/whiteboardSlice";
import cursorSliceReducer from "../CursorOverlay/cursorSlice";

export default configureStore({
  reducer: {
    whiteboard: whiteboardSliceReducer,
    cursor: cursorSliceReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});
