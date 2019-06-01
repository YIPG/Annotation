import React, { useState, useEffect, useContext, createRef } from "react";
import styled from "styled-components";
import { IdContext, fileNameContext } from "./index";
import { PromiseProvider } from "mongoose";

const Layer = styled.div.attrs(({ top, left, length }) => ({
  style: {
    top: top,
    left: left,
    height: length,
    width: length
  }
}))`
  position: absolute;
  box-sizing: border-box;
  &:hover {
    border: ${props => !props.clicked && "thin solid plum"};
  }
  border: ${props => props.clicked && "medium solid blueviolet"};
`;

export const LayerItem = props => {
  const [clicked, setClick] = useState(props.clicked);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const id = useContext(IdContext);
  const fileName = useContext(fileNameContext);

  let layerRef: React.RefObject<HTMLInputElement> = createRef();

  useEffect(() => {
    props.focus && layerRef.current.focus();
  }, [props.focus]);

  const updateRegions = async id => {
    setLoading(true);
    // クリックごとに座標データを送信

    console.log(clicked ? "今から削除するよ" : "追加するよ");
    const res = await fetch("http://localhost:3333/update", {
      method: "POST",
      body: JSON.stringify({
        id: id,
        fileName: fileName,
        add: !clicked,
        region: {
          x: props.left,
          y: props.top,
          w: props.length,
          h: props.length
        }
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (res.ok) {
      setLoading(false);
      setClick(!clicked);
    } else {
      setError(true);
    }
  };

  // TODO: MULTI OS
  // Macのみキー操作対応確認
  const handleKeyDown = target => {
    const { key } = target;
    key === "Enter" && updateRegions(id);
    key === "ArrowRight" && props.rightArrowClick();
    key === "ArrowLeft" && props.leftArrowClick();
  };

  return (
    <Layer
      ref={layerRef}
      onClick={() => {
        updateRegions(id);
      }}
      tabIndex={0}
      onKeyDown={target => handleKeyDown(target)}
      clicked={clicked}
      left={props.left}
      top={props.top}
      length={props.length}
    />
  );
};
