import React, { useState, useRef } from "react";
import Card from "./Card";
import { styled } from "styled-components";
import debounce from "lodash.debounce";


function Canvas({ contents }) {
  const Wrapper = styled.div`
    height: 200vh;
    width: 200vw;
    background-color: #efefef;
    overflow: scroll;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
  `;

  return (
    <Wrapper>
      {contents.map((c, i) => (
        <div key={i} >
            <Card content={c} />
        </div>
      ))}
    </Wrapper>
  );
}

export default Canvas;
