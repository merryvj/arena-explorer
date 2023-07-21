import React, { useState, useContext } from "react";
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
    height: 100%;
    width: 100%;
    background-color: rgba(240, 240, 240, 0.9);
    display: inline-block;
    backdrop-filter: blur(8px);
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

  return (
    <Draggable
      handle="#actions"
      onStart={handleDragStart}
      onStop={handleDragEnd}
    >
      <Wrapper>
        <Card
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Actions id="actions">
            <Title>{content.title}</Title>
            {isHovered && (
              <ActionButton onClick={() => setIsMinimized(!isMinimized)}>
                {isMinimized ? "+" : "-"}
              </ActionButton>
            )}
          </Actions>

          {!isMinimized && <CardContent content={content}/>}
        </Card>
      </Wrapper>
    </Draggable>
  );
}

const ActionButton = styled.button`
  & {
    position: absolute;
    top: 0;
    right: 4px;
    background: none;
    color: inherit;
    border: none;
    padding: 0;
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
  top: 0;
  height: 24px;
  width: 100%;
  border: dashed 1px blue;
  user-select: none;
  cursor: move;
`;

const Title = styled.div`
  width: 90%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export default Card;
