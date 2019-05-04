import React, { useState } from "react"
import styled from "styled-components"
import { Annotation } from "./annotation"
import { SlowBuffer } from "buffer"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const App = () => {
  return (
    <Wrapper>
      <h1>Select all squares with Person</h1>
      <Annotation column={4} />
    </Wrapper>
  )
}
