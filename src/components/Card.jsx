import React, { useState, useContext } from "react";
import { styled } from "styled-components";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";
import { CanvasContext } from "../App";

function Card({ content }) {
  const context = useContext(CanvasContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMoving, setIsMoving] = useState({ status: false, zIndex: 1 });
  let contentType = content.class;

  const ContentRenderer = () => {
    switch (contentType) {
      case "Text":
        return <TextBlock content={content} />;
        break;
      case "Link":
        return <LinkBlock content={content} />;
        break;
      case "Media":
        return <MediaBlock content={content} />;
        break;
      case "Image":
        return <ImageBlock content={content} />;
      default:
        return <div> hehe</div>;
        break;
    }
  };

  const Card = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    background-color: rgba(240, 240, 240, 0.9);
    display: inline-block;
    backdrop-filter: blur(8px);
    color: black;
    zIndex: ${isMoving.zIndex}
  `;

  const Wrapper = styled.div`
  width: 400px;
  height: ${isMinimized ? 28 : 275}px;
  zIndex: ${isMoving.zIndex}
  `

  const handleDragStart = () => {
    setIsMoving({ ...isMoving, status: true, zIndex: context.maxZIndex + 1 });
    context.isMoving = true;
    context.maxZIndex++;
  };

  const handleDragEnd = () => {
    setIsMoving({ ...isMoving, status: false });
    context.isMoving = false;
    console.log(context);
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

          {!isMinimized && <Content>{ContentRenderer()}</Content>}
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

const Content = styled.div`
  position: absolute;
  top: 24px;
  width: 100%;
  height: 100%;
  background-color: inherit;
  overflow: hidden;
  padding: 4px;
  border: dashed 1px blue;
  border-top: none;
  overscroll-behavior: none;
`;



const TextBlock = ({ content }) => {
  return <Text>{content.content}</Text>;
};

const LinkBlock = ({ content }) => {
    return <Frame src={content.source.url}></Frame>;
};

const MediaBlock = ({ content }) => {
  const html = content.embed.html;
  const regex = /src="([^"]*)"/;
  const match = html.match(regex);

  if (match && match.length > 1) {
    const srcValue = match[1];
    return <Frame src={srcValue} />;
  } else {
    return <Frame></Frame>;
  }
};

const ImageBlock = ({ content }) => {
  return <Image src={content.image.display.url} />;
};

const Text = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Frame = styled.iframe`
  height: 100%;
  width: 100%;
  border: none;
`;
export default Card;
