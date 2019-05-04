import React, { useState } from "react"
import styled from "styled-components"

const Layer = styled.div`
  position: absolute;
  bottom: ${props => props.bottom};
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
  return (
    <Layer
      onClick={() => setClick(!clicked)}
      clicked={clicked}
      left={props.left}
      bottom={props.bottom}
      length={props.length}
    />
  )
}
