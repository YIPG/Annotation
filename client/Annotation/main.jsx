import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { LayerList } from "./layerList"

const ImgWrapper = styled.section`
  position: relative;
`

const Img = styled.img`
  width: 500px;
`

export class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      height: 0,
      width: 0,
      length: 1
    }
  }

  render() {
    return (
      <ImgWrapper>
        <Img
          src={this.props.src}
          ref={el => (this.imgEl = el)}
          onLoad={() => {
            const { height, width } = this.imgEl
            this.setState(height)
            this.setState(width)
            this.setState(height / this.props.column)
          }}
        />
        <LayerList
          h={this.state.height}
          w={this.state.width}
          l={this.state.length}
        />
      </ImgWrapper>
    )
  }
}
