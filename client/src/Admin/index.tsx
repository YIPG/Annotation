import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { TaskList } from './adminTaskList'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10rem;
  padding-top: 3rem;
`

export const Admin = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  useEffect(() => {
    const fetchAll = async () => {
      const res = await fetch('/api/all', {})
      const result = await res.json()
      setData(result)
      setLoading(false)
    }
    fetchAll()
  }, [])

  if (loading) return <div />

  return (
    <Wrapper>
      <h1>タスク数: {data.length}</h1>
      <TaskList data={data} />
    </Wrapper>
  )
}
