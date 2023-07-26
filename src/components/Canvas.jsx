import React, {
  useEffect,
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
  const scale = useRef(1);
  const prevMouse = useRef(origin);

  const canvasElements = useMemo(() => {
    return contents.map((c, i) => (
        <Card key={i} content={c} idx={i} />
    ));
  }, [contents]);

  const Wrapper = styled.div`
    & {
      position: absolute;
      left:50%;
      top:50%;
      margin-left:-150vw;
      margin-top:-150vh;
      width: 300vw;
      height: 300vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #efefef;
      overflow: scroll;
      cursor: grab;
      transform: scale(${scale.current}) translate(${offset.current.x}px, ${offset.current.y}px)
    }
  `;

  const Grid = styled.div `
    height: 150vh;
    width: 150vw;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  `

  const mouseMove = useCallback((e) => {
    const dx = e.clientX - prevMouse.current.x;
    const dy = e.clientY - prevMouse.current.y;

    const maxTranslateX = canvasRef.current.offsetWidth;
    const maxTranslateY = canvasRef.current.offsetHeight;

    offset.current = {
        // x: Math.max(Math.min(offset.current.x + dx, 0), -maxTranslateX),
        // y: Math.max(Math.min(offset.current.y + dy, 0), -maxTranslateY),
        x: offset.current.x + dx,
        y: offset.current.y + dy
    }

    canvasRef.current.style.transform = `scale(${scale.current}) translate(${offset.current.x}px, ${offset.current.y}px)`;
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

  useEffect(() => {
    const handleZoom = (e) => {
      e.preventDefault();
      if (context.isScrollingFrame) return;
      scale.current += e.deltaY/1000;
      scale.current = Math.max(scale.current, 0.5);
      canvasRef.current.style.transform = `scale(${scale.current}) translate(${offset.current.x}px, ${offset.current.y}px)`;
    }

    let ref = canvasRef.current;
    if(!ref) return;
    ref.addEventListener("wheel", handleZoom, { passive: false });

    return () => {
      ref.removeEventListener("wheel", handleZoom);
    };
  }, [canvasRef])
  

  return (
    <Wrapper ref={canvasRef} onMouseDown={handlePan} onMouseUp={mouseUp}>
        <Grid>
          {canvasElements}
        </Grid>
    </Wrapper>
  );
}

export default Canvas;
