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
  const [offset, setOffset] = useState(origin);
  const prevMouse = useRef(origin);

  const canvasElements = useMemo(() => {
    return contents.map((c, i) => (
        <Card key={i} content={c} idx={i} />
    ));
  }, [contents]);

  const Wrapper = styled.div`
    & {
      position: absolute;
      height: 200vh;
      width: 200vw;
      background-color: #efefef;
      overflow: scroll;
      display: grid;
      cursor: grab;
      grid-template-columns: repeat(6, 1fr);
      transform: translate(${offset.x}px, ${offset.y}px);
    }
  `;

  const mouseMove = useCallback((e) => {
    const dx = e.clientX - prevMouse.current.x;
    const dy = e.clientY - prevMouse.current.y;

    const maxTranslateX = canvasRef.current.offsetWidth;
    const maxTranslateY = canvasRef.current.offsetHeight;

    setOffset((prevOffset) => ({
      x: Math.max(Math.min(prevOffset.x + dx, 0), -maxTranslateX / 4),
      y: Math.max(Math.min(prevOffset.y + dy, 0), -maxTranslateY / 4),
    }));

    prevMouse.current.x = e.clientX;
    prevMouse.current.y = e.clientY;
  }, []);

  const mouseUp = useCallback(() => {
    window.removeEventListener("mousemove", mouseMove);
    window.removeEventListener("mouseup", mouseUp);
    canvasRef.current.style.userSelect = "auto";
    canvasRef.current.style.cursor = "grab";
  }, [mouseMove]);

  const handlePan = useCallback(
    (e) => {
      if (context.isMoving) {
        return;
      };

      prevMouse.current = { x: e.pageX, y: e.pageY };
      window.addEventListener("mousemove", mouseMove);
      window.addEventListener("mouseup", mouseUp);

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
