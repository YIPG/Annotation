import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { LayerItem } from "./layerItem"

const LayerWrapper = styled.div`
  position: absolute;
  list-style: none;
  bottom: 0;
  left: 0;
  height: ${props => props.h};
  width: ${props => props.w};
`

export const LayerList = props => {
  const [hwList, setHWList] = useState([])
  const { h, w, l } = props

  // create height and width list
  useEffect(() => {
    if (h <= 0 || w <= 0) return

    const hNum = Math.ceil(h / l),
      wNum = Math.ceil(w / l)

    const hList = new Array<number>(hNum).fill(0).map((_, i) => i * l)
    const wList = new Array<number>(wNum).fill(0).map((_, i) => i * l)

    setHWList(hList.map(x => wList.map(y => [x, y])).flat())
  }, [h])

  const layerList = hwList.map(hw => {
    return (
      <li key={String(hw[0]) + String(hw[1])}>
        <LayerItem top={hw[0]} left={hw[1]} length={l} />
      </li>
    )
  })

  return (
    <LayerWrapper h={h} w={w}>
      {layerList}
    </LayerWrapper>
  )
}
