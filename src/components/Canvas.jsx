import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useContext
} from "react";
import Card from "./Card";
import { styled } from "styled-components";
import { CanvasContext } from "../App";


function Canvas({ contents }) {
    const context = useContext(CanvasContext);
  const canvasRef = useRef();
  const origin = { x: 0, y: 0 };
  const offset = useRef(origin);
  const prevMouse = useRef(origin);

  const canvasElements = useMemo(() => {
    return contents.map((c, i) => (
        <Card key={i} content={c} idx={i} />
    ));
  }, [contents]);

  const Wrapper = styled.div`
    & {
      width: 150vw;
      height: 200vh;
      background-color: #efefef;
      overflow: scroll;
      display: grid;
      cursor: grab;
      grid-template-columns: repeat(5, 1fr);
      transform: translate(${offset.current.x}px, ${offset.current.y}px)
    }
  `;

  const mouseMove = useCallback((e) => {
    const dx = e.clientX - prevMouse.current.x;
    const dy = e.clientY - prevMouse.current.y;

    const maxTranslateX = canvasRef.current.offsetWidth;
    const maxTranslateY = canvasRef.current.offsetHeight;

    offset.current = {
        x: Math.max(Math.min(offset.current.x + dx, 0), -maxTranslateX / 3),
        y: Math.max(Math.min(offset.current.y + dy, 0), -maxTranslateY / 4),
        // x: offset.current.x + dx,
        // y: offset.current.y + dy
    }

    canvasRef.current.style.transform = `translate(${offset.current.x}px, ${offset.current.y}px)`;
    prevMouse.current.x = e.clientX;
    prevMouse.current.y = e.clientY;
  }, []);

  const mouseUp = useCallback(() => {
    canvasRef.current.removeEventListener("mousemove", mouseMove);
    canvasRef.current.removeEventListener("mouseup", mouseUp);
    canvasRef.current.style.userSelect = "auto";
    canvasRef.current.style.cursor = "grab";
  }, [mouseMove]);

  const handlePan = useCallback(
    (e) => {
      if (context.isMoving) {
        return;
      }

      prevMouse.current = { x: e.pageX, y: e.pageY };
      canvasRef.current.addEventListener("mousemove", mouseMove);
      canvasRef.current.addEventListener("mouseup", mouseUp);

      canvasRef.current.style.userSelect = "none";
      canvasRef.current.style.cursor = "grabbing";
    
    },
    [mouseMove, mouseUp]
  );

  return (
    <Wrapper ref={canvasRef} onMouseDown={handlePan} onMouseUp={mouseUp}>
        {canvasElements}
    </Wrapper>
  );
}

export default Canvas;
