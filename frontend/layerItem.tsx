import React, { useState, useContext } from "react"
import styled from "styled-components"
import { IdContext } from './app'

const Layer = styled.div`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  height: ${props => props.length};
  width: ${props => props.length};
  box-sizing: border-box;
  &:hover {
    border: ${props => !props.clicked && "thin solid plum"};
  }
  border: ${props => props.clicked && "medium solid blueviolet"};
`

export const LayerItem = props => {
  const [clicked, setClick] = useState(false)
  const id = useContext(IdContext)

  const updateRegions = async id => {
    console.log("いまからクリック情報をサーバーにおくるよ")

    // クリックごとに座標データを送信
    await fetch("http://localhost:3333/update", {
      method: "POST",
      body: JSON.stringify({
        id: id,
        region: { x: props.left, y: props.top, w: props.length, h: props.length }
      }),
      headers: {
        "Content-Type": "application/json"
      },
    })
    console.log("クリック情報をサーバーにおくったよ")
  }

  return (
    <Layer
      onClick={() => {
        setClick(!clicked)
        updateRegions(id)
      }}
      clicked={clicked}
      left={props.left}
      top={props.top}
      length={props.length}
    />
  )
}
