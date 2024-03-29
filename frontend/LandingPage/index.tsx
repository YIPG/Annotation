import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 3rem;
  padding-top: 3rem;
`

const OptionWrapper = styled(Link)`
  border: 1px solid #eee;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
  color: #303133;
  width: 35%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  text-decoration: none;
  transition: 0.1s;
  :hover {
    color: #409eff;
  }
`

export const LP = () => {
  return (
    <React.Fragment>
      <Wrapper>
        <OptionWrapper to="/admin">Admin</OptionWrapper>
        <OptionWrapper to="/upload">Task</OptionWrapper>
      </Wrapper>
    </React.Fragment>
  )
}
