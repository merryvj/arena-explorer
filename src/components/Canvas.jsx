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
  const [camera, setCamera] = React.useState({
    x: 0,
    y: 0,
    z: 1
  });

  //turns a screen point into a canvas point
function screenToCanvas(point, camera) {
  return {
    x: point.x / camera.z - camera.x,
    y: point.y / camera.z - camera.y,
  };
}

function panCamera(camera, dx, dy) {
  return {
    x: camera.x - dx / camera.z,
    y: camera.y - dy / camera.z,
    z: camera.z,
  };
}

function zoomCamera(camera, point, dz) {
  const zoom = camera.z - dz * camera.z;

  const p1 = screenToCanvas(point, camera);

  const p2 = screenToCanvas(point, { ...camera, z: zoom });

  return {
    x: camera.x + (p2.x - p1.x),
    y: camera.y + (p2.y - p1.y),
    z: zoom,
  };
}


  const transform = `scale(${camera.z}) translate(${camera.x}px, ${camera.y}px)`;


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
      transform: ${transform}
    }
  `;

  const handleZoom = (e) => {
    e.preventDefault();
    console.log(transform);
      const { clientX, clientY, deltaX, deltaY, ctrlKey } = e;

      if (ctrlKey) {
        setCamera((camera) =>
          zoomCamera(camera, { x: clientX, y: clientY }, deltaY / 400)
        );
      } else {
        setCamera((camera) => panCamera(camera, deltaX, deltaY));
      };

      canvasRef.current.style.transform = transform;
  }


  return (
    <Wrapper ref={canvasRef} onWheel={(e) => handleZoom(e)}>
        {canvasElements}
    </Wrapper>
  );
}

export default Canvas;
