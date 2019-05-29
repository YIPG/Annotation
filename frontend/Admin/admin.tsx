import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { TaskList } from "./adminTaskList"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Admin = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  useEffect(() => {
    const fetchAll = async () => {
      const res = await fetch("http://localhost:3333/progress", {})
      const result = await res.json()
      console.log(result)
      setData(result)
      setLoading(false)
    }
    fetchAll()
  }, [])

  if (loading) return <h1>Loading...</h1>
  return (
    <Wrapper>
      <h1>タスク数: {data.length}</h1>
      <TaskList data={data} />
    </Wrapper>
  )
}
