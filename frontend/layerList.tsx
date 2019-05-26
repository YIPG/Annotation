import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { LayerItem } from "./layerItem";

const LayerWrapper = styled.div`
  position: absolute;
  list-style: none;
  bottom: 0;
  left: 0;
  height: ${props => props.h};
  width: ${props => props.w};
`;

export const LayerList = props => {
  const [hwList, setHWList] = useState([]);
  const { h, w, l } = props;

  function update() {
    console.log(`h is ${h}, w is ${w}, l is ${l}`);
    const hNum = Math.ceil(h / l),
      wNum = Math.ceil(w / l);
    const tmpHList = [],
      tmpWList = [],
      tmphwList = [];
    console.log(`hNum is ${hNum}, wnum is ${wNum}`);
    for (let i = 0; i < hNum; i++) {
      tmpHList.push(i * l);
    }
    for (let i = 0; i < wNum; i++) {
      tmpWList.push(i * l);
    }
    if (tmpHList.length !== 0 && tmpWList.length !== 0) {
      console.log("hwListをセット");
      tmpHList.forEach(height => {
        tmpWList.forEach(width => {
          tmphwList.push({
            height: height,
            width: width
          });
        });
      });
      setHWList(tmphwList);
      console.log(`hwlistのセットが終わった. ${hwList}`);
      // console.log(`セットしたぜ. Hlist is ${hList[0]}`)
    }
  }

  useEffect(() => {
    update();
  }, [h]);

  const layerList = hwList.map(hw => {
    return (
      <li key={String(hw.height) + String(hw.width)}>
        <LayerItem top={hw.height} left={hw.width} length={l} />
      </li>
    );
  });

  return (
    <LayerWrapper h={h} w={w}>
      {layerList}
    </LayerWrapper>
  );
};
