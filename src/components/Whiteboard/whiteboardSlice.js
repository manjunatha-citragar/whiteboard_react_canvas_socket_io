import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tool: null,
  elements: [],
  playRecordedSession: false,
};

const whiteboardSlice = createSlice({
  name: "whiteboard",
  initialState,
  reducers: {
    setToolType: (state, action) => {
      state.tool = action.payload;
    },
    updateElement: (state, action) => {
      const { id } = action.payload || { id: 0 };

      const index = state.elements.findIndex((el) => el.id === id);

      if (index === -1) {
        state.elements.push(action.payload);
      } else {
        state.elements[index] = action.payload;
      }
    },
    setElements: (state, action) => {
      state.elements = action.payload;
    },
    setIsSessionRecording: (state, action) => {
      console.log("Session Recording:", action.payload);
      state.playRecordedSession = action.payload;
    },
  },
});

export const {
  setToolType,
  updateElement,
  setElements,
  setIsSessionRecording,
} = whiteboardSlice.actions;

export default whiteboardSlice.reducer;
