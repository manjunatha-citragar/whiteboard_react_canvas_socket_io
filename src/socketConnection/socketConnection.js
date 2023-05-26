import { io } from "socket.io-client";
import {
  setElements,
  setToolType,
  updateElement,
} from "../components/Whiteboard/whiteboardSlice";
import store from "../store/store";

let socket;

export const connectWithSocketServer = () => {
  socket = io("https://j3p7xs-3003.csb.app/");

  socket.on("connect", () => {
    console.log("connected to server");
  });

  socket.on("whiteboard-state", (elements) => {
    store.dispatch(setElements(elements));
  });

  socket.on("element-update", (updatedElement) => {
    store.dispatch(updateElement(updatedElement));
  });

  socket.on("clear-whiteboard", () => {
    store.dispatch(setElements([]));
    store.dispatch(setToolType(null));
  });
};

export const emitElementUpdate = (elementData) => {
  socket.emit("element-update", elementData);
};

export const clearWhiteboard = () => {
  socket.emit("clear-whiteboard");
};
