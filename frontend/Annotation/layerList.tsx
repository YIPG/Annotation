import React, { useState, useEffect, useContext, Component } from "react"
import styled from "styled-components"
import { LayerItem } from "./layerItem"
import { clickContext } from "./index"

const LayerWrapper = styled.div`
  position: absolute;
  list-style: none;
  bottom: 0;
  left: 0;
  height: ${props => props.h};
  width: ${props => props.w};
`

interface IProps {
  h: number
  w: number
  l: number
  regions: any
  nextImage: any
  preImage: any
}

interface IState {
  hwList: any
  focusIndex: number
}

export class LayerList extends Component<IProps, IState> {
  constructor(props) {
    super(props)

    this.state = {
      hwList: null,
      focusIndex: 0
    }
  }

  componentDidMount() {
    this.initLayer()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.h !== this.props.h) {
      this.initLayer()
    }
  }

  initLayer() {
    const { h, w, l } = this.props

    const hNum = Math.ceil(h / l),
      wNum = Math.ceil(w / l)

    const hList = new Array<number>(hNum).fill(0).map((_, i) => i * l)
    const wList = new Array<number>(wNum).fill(0).map((_, i) => i * l)

    this.setState({
      hwList: hList.map(x => wList.map(y => [x, y])).flat(),
      focusIndex: 0
    })
  }

  setFocusIndex(index) {
    this.setState({
      focusIndex: index
    })
  }

  // Keyboard Shortcut
  handleKeyDown(target) {
    const { key, altKey } = target
    const { focusIndex, hwList } = this.state
    const wNum = Math.ceil(this.props.w / this.props.l)

    key === "ArrowRight" &&
      (altKey
        ? this.props.nextImage()
        : focusIndex < hwList.length - 1 &&
          this.setState({
            focusIndex: focusIndex + 1
          }))
    key === "ArrowLeft" &&
      (altKey
        ? this.props.preImage()
        : focusIndex > 0 &&
          this.setState({
            focusIndex: focusIndex - 1
          }))
    key === "ArrowUp" &&
      focusIndex > wNum - 1 &&
      this.setState({
        focusIndex: focusIndex - wNum
      })
    key === "ArrowDown" &&
      focusIndex < hwList.length - wNum &&
      this.setState({
        focusIndex: focusIndex + wNum
      })
  }

  render() {
    const { hwList, focusIndex } = this.state
    const { h, w, l, regions } = this.props
    const layerList =
      regions &&
      hwList &&
      hwList.map((hw, index) => (
        <li key={String(hw[0]) + String(hw[1])}>
          <LayerItem
            handleKeyDown={this.handleKeyDown.bind(this)}
            index={index}
            focusIndex={focusIndex}
            setFocusIndex={this.setFocusIndex.bind(this)}
            clicked={this.props.regions.some(
              i => i.y === hw[0] && i.x === hw[1]
            )}
            top={hw[0]}
            left={hw[1]}
            length={l}
          />
        </li>
      ))
    return (
      <LayerWrapper h={h} w={w}>
        {layerList}
      </LayerWrapper>
    )
  }
}
