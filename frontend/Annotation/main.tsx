import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { LayerList } from "./layerList";
import { clickContext } from "./index";

const ImgWrapper = styled.section`
  position: relative;
`;

const Img = styled.img`
  width: 500px;
`;

export const Main = props => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [length, setLength] = useState(1);

  return (
    <ImgWrapper>
      <Img
        src={props.src}
        ref={el => (this.imgEl = el)}
        onLoad={() => {
          const { height, width } = this.imgEl;
          setHeight(height);
          setWidth(width);
          setLength(height / props.column);
        }}
      />
      <clickContext.Consumer>
        {regions => (
          <LayerList regions={regions} h={height} w={width} l={length} />
        )}
      </clickContext.Consumer>
    </ImgWrapper>
  );
};
