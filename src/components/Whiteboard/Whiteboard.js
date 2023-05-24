import React, {useRef, useLayoutEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import Menu from "./Menu";

import rough from 'roughjs/bundled/rough.esm';
import { actions, toolTypes } from "../../constants";
import {v4 as uuid} from 'uuid';
import { createElement } from "./utils/createElement";
import { updateElement } from "./whiteboardSlice";

let selectedElement;

const setSelectedElement= (el) => {
  selectedElement = el;
};

const Whiteboard = () => {
  const canvasRef = useRef();
  const toolType = useSelector((state) => state.whiteboard.tool);
  const elements= useSelector((state) => state.whiteboard.elements);
  const dispatch = useDispatch();
  
  const [action, setAction] = useState(null);
  
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    
    const rc = rough.canvas(canvas);
    rc.circle(80, 120, 50); // centerX, centerY, diameter
    rc.ellipse(300, 100, 150, 80); // centerX, centerY, width, height
    rc.line(80, 120, 300, 100); // x1, y1, x2, y2
    
  }, []);
  
  const handleMouseDown = (event) => {
    const {clientX, clientY} = event;
    
    if(toolType === toolTypes.RECTANGLE) {
      setAction(actions.DRAWING);
    }
    
    const element = createElement({
      x1: clientX,
      y1: clientY,
      x2: clientX,
      y2: clientY,
      id: uuid(),
      toolType,
    });
    setSelectedElement(element);
    dispatch(updateElement(element));
  };
  
  const handleMouseUP = () => {
    setAction(null);
    setSelectedElement(null);
  };
  
  const handleMouseMove = (event) => {
    const {clientX, clientY} = event;
    
    if(action === actions.DRAWING) {
      // find index of selected element
      const index = elements.findIndex((ele) => ele.id === selectedElement.id);
      
      if(index !== -1) {
        updateElement({
          x1: elements[index].x1,
          y1: elements[index].y1,
          x2: clientX,
          y2: clientY,
          id: elements[index].id,
          tool: elements[index].toolType,
        }, elements)
      }
    }
  }
  
  return (
    <>
      <Menu />
      <canvas 
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUP}
        onMouseMove={handleMouseMove}
        ref={canvasRef}
        height={window.innerHeight}
        width={window.innerWidth}
      />
    </>
  );
};

export default Whiteboard;
