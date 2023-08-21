import React, { useState, useContext } from "react";
import { createPortal } from "react-dom";
import { styled } from "styled-components";
import Draggable from "react-draggable";
import { CanvasContext } from "../App";
import CardContent from "./CardContent";

function Card({ content }) {
  const context = useContext(CanvasContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMoving, setIsMoving] = useState({ status: false, zIndex: 1 });

  const Card = styled.div`
    position: relative;
    height: ${isMinimized ? "0" : "100%"};
    width: 100%;
    background-color: rgba(240, 240, 240, 0.9);
    color: black;
  `;

  const Wrapper = styled.div`
    width: 400px;
    height: ${isMinimized ? 28 : 275}px;
    z-index: ${isMoving.zIndex};
  `;

  const handleDragStart = () => {
    setIsMoving({ ...isMoving, status: true, zIndex: context.maxZIndex + 1 });
    context.isMoving = true;
    context.maxZIndex++;
  };

  const handleDragEnd = () => {
    setIsMoving({ ...isMoving, status: false });
    context.isMoving = false;
  };

  const handleFrameScroll = () => {
    context.isScrollingFrame = true;

    setTimeout(() => {
      context.isScrollingFrame = false;
    }, 1000)
  }
  return (
    <Draggable
      handle="#actions"
      onStart={handleDragStart}
      onStop={handleDragEnd}
      cancel="button"
    >
      <Wrapper>
        <Card
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => { setIsMoving({ ...isMoving, zIndex: context.maxZIndex + 1 }) }}
        >

          <Actions id="actions">
            <Title>{content.title}</Title>
            <ActionButtons>
              <ActionButton onClick={() => setIsMinimized(!isMinimized)}>
                {isMinimized ? "+" : "-"}
              </ActionButton>
              {/* <ActionButton>*</ActionButton> */}
            </ActionButtons>
          </Actions>


          {!isMinimized && <CardContent content={content} onWheel={handleFrameScroll} />}
        </Card>
      </Wrapper>
    </Draggable>
  );
}

const ActionButtons = styled.div`
  top: 0;
  position: absolute;
  height: 100%;
  width: 100%;
`;
const ActionButton = styled.button`
  & {
    float: right;
    background: none;
    color: inherit;
    border: none;
    padding: 0 8px;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    color: blue;
  }

  &:active {
    outline: none;
  }
`;

const Actions = styled.div`
  position: absolute;
  top: -24px;
  height: 24px;
  width: 100%;
  border: dashed 1px blue;
  user-select: none;
  cursor: move;
  background-color: inherit;
`;

const Title = styled.div`
  width: 90%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export default Card;
