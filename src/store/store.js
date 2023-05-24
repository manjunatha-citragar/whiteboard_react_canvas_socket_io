import { configureStore } from "@reduxjs/toolkit";

import whiteboardSliceReducer from "../components/Whiteboard/whiteboardSlice";

export default configureStore({
  reducer: {
    whiteboard: whiteboardSliceReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: ['whiteboard/setElements'],
        ignorePaths: ['whiteboard.elements']
      }
    })
  }
});
