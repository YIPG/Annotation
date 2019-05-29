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

  const update = () => {
    if (h <= 0 || w <= 0) return

    const hNum = Math.ceil(h / l),
      wNum = Math.ceil(w / l)

    console.log({ hNum, l, wNum })
    const tmpHList = new Array(hNum).fill(0).map((_, i) => i * l)
    const tmpWList = new Array(wNum).fill(0).map((_, i) => i * l)

    // FIX ME:
    // NOT SOPHISTICATED
    const tmphwList = []

    if (tmpHList.length !== 0 && tmpWList.length !== 0) {
      tmpHList.forEach(height => {
        tmpWList.forEach(width => {
          tmphwList.push({
            height: height,
            width: width
          })
        })
      })

      setHWList(tmphwList)
    }
  }

  useEffect(() => {
    update()
  }, [h])

  const layerList = hwList.map(hw => {
    return (
      <li key={String(hw.height) + String(hw.width)}>
        <LayerItem top={hw.height} left={hw.width} length={l} />
      </li>
    )
  })

  return (
    <LayerWrapper h={h} w={w}>
      {layerList}
    </LayerWrapper>
  )
}
