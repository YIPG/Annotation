import React from "react"
import styled from "styled-components"
import { getPercentage } from "../util"
import { Button } from "../util/Button"

const Wrapper = styled.div`
  border: 1px solid #d7dae2;
  border-radius: 4px;
  max-width: 750px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 80%;
  padding: 0 20px;
  margin: 5px 0;
`

const TaskWrapper = styled.h3`
  margin-right: auto;
`

const AWrapper = styled.a`
  margin-left: 10px;
`

export const TaskItem = props => {
  console.log(props.data)
  const clickedImages = props.data.images.filter(
    item => item.regions.length > 0
  )
  const allImages = props.data.images
  return (
    <Wrapper>
      <TaskWrapper>
        タスク名:{" "}
        <a href={"http://localhost:1234/tasks/" + props.data._id}>
          {props.data.task}
        </a>
      </TaskWrapper>
      <h3>
        進捗:
        {getPercentage(clickedImages.length, allImages.length)}% (
        {clickedImages.length}枚/{allImages.length}枚中)
      </h3>
      <AWrapper
        href={"http://localhost:3333/getResult?id=" + props.data._id}
        download={props.data.task + ".json"}
      >
        <Button>進捗ダウンロード(JSON)</Button>
      </AWrapper>
    </Wrapper>
  )
}
