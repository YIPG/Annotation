import React, { useState, useEffect, createContext } from "react"
import styled from "styled-components"
import { Main } from "./main"
import { Button } from "../util/Button"

const Wrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ButtonWrapper = styled.div`
  flex-direction: row;
  padding: 2rem;
`

const NavButton = styled(Button)`
  margin: 0 2rem;
`

export const IdContext = createContext(null)
export const fileNameContext = createContext(null)
export const clickContext = createContext(null)

export const Annotation = ({ match }) => {
  const [index, setIndex] = useState(0)
  const [data, setData] = useState(null)
  const [fetchSuccess, setFetchSuccess] = useState(false)
  useEffect(() => {
    // 画像データをフェッチ
    const fetchData = async id => {
      const res = await fetch("http://localhost:3333/db?id=" + id)
      const result = await res.json()
      console.log({ result })
      setData(result)
      setFetchSuccess(true)
    }

    fetchData(match.params.id)
  }, [match.params.id, index])

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
          <clickContext.Provider value={data.images[index].regions}>
            <Main
              column={data.divide}
              src={"http://localhost:3333/uploads/" + data.data[index].filename}
              name={data.data[index].filename}
            />
          </clickContext.Provider>
        </fileNameContext.Provider>
      </IdContext.Provider>
      <ButtonWrapper>
        {index !== 0 && (
          <NavButton onClick={() => setIndex(index - 1)}>前へ</NavButton>
        )}
        {index !== data.data.length - 1 && (
          <NavButton onClick={() => setIndex(index + 1)}>次へ</NavButton>
        )}
      </ButtonWrapper>
    </Wrapper>
  )
}
