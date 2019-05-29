import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const HeaderWrapper = styled.header`
  margin: 0;
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  padding-left: 1rem;
  height: 3rem;
  border-bottom: 1px solid #eee;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
  position: static;
  top: 0;
`

const HeaderText = styled(Link)`
  color: #303133;
  text-decoration: none;
  padding: 1rem;
  transition: 0.1s;
  :hover {
    color: #409eff;
  }
`

export const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderText to="/">Annotation App</HeaderText>
    </HeaderWrapper>
  )
}
