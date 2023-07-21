import React from "react";
import { styled } from "styled-components";

function CardContent({ content }) {
    let type = content.class;
  const ContentRenderer = () => {
    switch (type) {
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

  return <Content>{ContentRenderer()}</Content>;
}

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

export default CardContent;