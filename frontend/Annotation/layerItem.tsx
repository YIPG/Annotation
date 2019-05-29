import React, { useState, useContext } from "react"
import styled from "styled-components"
import { IdContext, fileNameContext } from "./index"

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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const id = useContext(IdContext)
  const fileName = useContext(fileNameContext)

  const updateRegions = async id => {
    setLoading(true)
    // クリックごとに座標データを送信

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
    })

    if (res.ok) {
      setLoading(false)
      setClick(!clicked)
    } else {
      setError(true)
    }
  }

  return (
    <Layer
      onClick={() => {
        updateRegions(id)
      }}
      clicked={clicked}
      left={props.left}
      top={props.top}
      length={props.length}
    />
  )
}
