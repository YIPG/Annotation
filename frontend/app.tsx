import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Annotation } from "./annotation"
import { string } from "prop-types"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ButtonWrapper = styled.div`
  flex-direction: row;
`

const Button = styled.button`
  margin: 30px;
`

export const App = ({ match }) => {
  const [index, setIndex] = useState(0)
  const [data, setData] = useState(null)
  const [fetchSuccess, setFetchSuccess] = useState(false)
  useEffect(() => {
    fetchData(match.params.id)
  }, [match.params.id])

  const fetchData = async id => {
    const res = await fetch("http://localhost:3333/db", {
      method: "POST",
      body: JSON.stringify({ id: id }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const result = await res.json()
    console.log(result)
    setData(result)
    setFetchSuccess(true)
  }

  const sendData = async name => {}

  if (!fetchSuccess)
    return (
      <Wrapper>
        <h1>Loading...</h1>
      </Wrapper>
    )
  return (
    <Wrapper>
      <h1>Select all squares with {data.task}</h1>
      <Annotation
        column={data.divide}
        // FIX ME
        // FOR DEPLOY, DONT USE LOCALHOST
        src={"http://localhost:3333/uploads/" + data.data[index].filename}
        name={data.data[index].filename}
      />
      <ButtonWrapper>
        {index !== 0 && (
          <Button onClick={() => setIndex(index - 1)}>前へ</Button>
        )}
        {index !== data.data.length - 1 && (
          <Button onClick={() => setIndex(index + 1)}>次へ</Button>
        )}
      </ButtonWrapper>
    </Wrapper>
  )
}