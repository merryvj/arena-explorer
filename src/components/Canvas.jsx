import React, { useState, useRef, useCallback } from "react";
import Card from "./Card";
import { styled } from "styled-components";
import debounce from "lodash.debounce";

function Canvas({ contents }) {
  const origin = { x: 0, y: 0 };
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState(origin);
  const [mouse, setMouse] = useState(origin);
  const prevOffset = useRef(origin);
  const prevMouse = useRef(origin);
  const [isPanning, setIsPanning] = useState(false);

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
    transform: translate(-50%, -50%) scale(${scale})
      translate(${offset.x}px, ${offset.y}px);
    }

    &:active{
        cursor: grabbing;
    }
  `;


  const handleWheel = useCallback(
    (e) => {
      e.preventDefault();
      const scaleMultiplier = 1.1;
      const newScale =
        scale * (event.deltaY > 0 ? 1 / scaleMultiplier : scaleMultiplier);
      setScale(Math.min(Math.max(0.2, newScale), 4));
    },
    [scale]
  );

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
  }, [mouseMove]);

  const handlePan = useCallback((e) => {
 
    prevMouse.current = { x: e.pageX, y: e.pageY };
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);
  }, [mouseMove, mouseUp]);

  return (
    <Wrapper onWheel={handleWheel} onMouseDown={handlePan} onMouseUp={mouseUp}>
      {contents.map((c, i) => (
        <div key={i}>
          <Card content={c} />
        </div>
      ))}
    </Wrapper>
  );
}

export default Canvas;
