import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { LayerList } from "./layerList"

const ImgWrapper = styled.section`
  position: relative;
`

const Img = styled.img`
  width: 500px;
`

const LayerWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
`

export const Annotation = props => {
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)
  const [length, setLength] = useState(1)

  return (
    <ImgWrapper>
      <Img
        src={props.src}
        ref={el => (this.imgEl = el)}
        onLoad={() => {
          const { height, width } = this.imgEl
          setHeight(height)
          setWidth(width)
          setLength(height / props.column)
        }}
      />
      <LayerList h={height} w={width} l={length} />
    </ImgWrapper>
  )
}
