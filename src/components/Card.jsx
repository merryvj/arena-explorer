import React, {useState} from "react";
import { styled } from "styled-components";
import Draggable from "react-draggable";
import { Resizable } from 'react-resizable';


function Card({ content }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
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

  const Wrapper = styled.div`
    position: absolute;
    width: 400px;
    height: ${isMinimized ? 28 : 275}px;
    background-color: rgba(240, 240, 240, 0.9);
    display: inline-block;
    backdrop-filter: blur(8px);
    margin: 48px;
    color: black;
`;

  return (
    <Draggable handle="#actions">
      <Wrapper
        onMouseDown={() => handleMouseDown(e)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
       <Actions id="actions">
            <Title>{content.title}</Title> 
            {isHovered && (
                <ActionButton
                    onClick={() => setIsMinimized(!isMinimized)}                    
                    >
                    {isMinimized ? '+' : '-' }
                </ActionButton>
            )}
        </Actions>

        {!isMinimized && <Content>{ContentRenderer()}</Content>}
      </Wrapper>
    </Draggable>
  );
}

const ActionButton = styled.button `
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
`
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
`

const Content = styled.div`
    position: absolute;
    top: 24px;
    width: 100%;
    height: 100%;
    overflow: scroll;
    padding: 4px;
    border: dashed 1px blue;
    border-top: none;
    overscroll-behavior: none;

`


const TextBlock = ({ content }) => {
  return <div>{content.content}</div>;
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
        return <Frame src={srcValue}/>
      } else {
        return <Frame></Frame>
      }
};

const ImageBlock = ({content}) => {
    return (
        <Image src={content.image.display.url}/>
    )
}

const Image = styled.img `
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const Frame = styled.iframe`
    height: 100%;
    width: 100%;
    border: none;
`;
export default Card;
