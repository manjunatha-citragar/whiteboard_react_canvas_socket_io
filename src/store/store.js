import { configureStore } from "@reduxjs/toolkit";

import whiteboardSliceReducer from "../components/Whiteboard/whiteboardSlice";

export default configureStore({
  reducer: {
    whiteboard: whiteboardSliceReducer
  }
});
