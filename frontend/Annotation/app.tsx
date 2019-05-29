import React, { useState, useEffect, createContext } from "react"
import styled from "styled-components"
import { Annotation } from "./annotation"
import { string } from "prop-types"
import { create } from "domain"

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

export const IdContext = createContext(null)
export const fileNameContext = createContext(null)

export const App = ({ match }) => {
  const [index, setIndex] = useState(0)
  const [data, setData] = useState(null)
  const [fetchSuccess, setFetchSuccess] = useState(false)
  useEffect(() => {
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
    fetchData(match.params.id)
  }, [match.params.id])

  if (!fetchSuccess)
    return (
      <Wrapper>
        <h1>Loading...</h1>
      </Wrapper>
    )
  return (
    <Wrapper>
      <h1>Select all squares with {data.task}</h1>
      <IdContext.Provider value={match.params.id}>
        <fileNameContext.Provider value={data.data[index].originalname}>
          <Annotation
            column={data.divide}
            // FIX ME
            // FOR DEPLOY, DONT USE LOCALHOST
            src={"http://localhost:3333/uploads/" + data.data[index].filename}
            name={data.data[index].filename}
          />
        </fileNameContext.Provider>
      </IdContext.Provider>
      <ButtonWrapper>
        {index !== 0 && (
          <Button onClick={() => setIndex(index - 1)}>前へ</Button>
        )}
        {index !== data.data.length - 1 && (
          <Button onClick={() => setIndex(index + 1)}>次へ</Button>
        )}
      </ButtonWrapper>
      <a href="http://localhost:1234">タスクアップロードページへ</a>
    </Wrapper>
  )
}
