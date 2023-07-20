import React, {useState, useRef, useCallback, useMemo } from "react";
import Card from "./Card";
import { styled } from "styled-components";

function Canvas({ contents }) {
    const canvasRef = useRef();
  const origin = { x: 0, y: 0 };
  const [offset, setOffset] = useState(origin);
  const prevMouse = useRef(origin);

  const canvasElements = useMemo(() => {
    return (
        contents.map((c, i) => (
            <div key={i}>
              <Card content={c} />
            </div>
          ))
    )
  }, [contents])

  const Wrapper = styled.div`
    &{
        position: absolute;
    top: 50%;
    left: 50%;
    height: 200vh;
    width: 200vw;
    background-color: #efefef;
    overflow: scroll;
    display: grid;
    cursor: grab;
    grid-template-columns: repeat(6, 1fr);
    transform: translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px);
    }

    &:active{
        cursor: grabbing;
    }
  `;

  const mouseMove = useCallback((e) => {
    console.log('hiii')
    const dx = e.clientX - prevMouse.current.x;
    const dy = e.clientY - prevMouse.current.y;

    setOffset((prevOffset) => ({
      x: prevOffset.x + dx,
      y: prevOffset.y + dy,
    }));

    prevMouse.current.x = e.clientX;
    prevMouse.current.y = e.clientY;
  }, []);


  const mouseUp = useCallback(() => {
    window.removeEventListener("mousemove", mouseMove);
    window.removeEventListener("mouseup", mouseUp);
    canvasRef.current.style.userSelect = 'auto';
  }, [mouseMove]);

  const handlePan = useCallback((e) => {
 
    prevMouse.current = { x: e.pageX, y: e.pageY };
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);
    
    canvasRef.current.style.userSelect = 'none';
  }, [mouseMove, mouseUp]);

  return (
    <Wrapper ref={canvasRef} onMouseDown={handlePan} onMouseUp={mouseUp}>
      {canvasElements}
    </Wrapper>
  );
}

export default Canvas;
