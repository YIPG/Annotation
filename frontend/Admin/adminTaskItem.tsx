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

const DownloadButton = styled(Button)`
  margin-left: 1rem;
`

const Link = styled.a`
  color: #303133;
  text-decoration: none;
  text-decoration-line: underline;
  transition: 0.1s;
  :hover {
    color: #409eff;
  }
`

export const TaskItem = props => {
  const clickedImages = props.data.images.filter(
    item => item.regions.length > 0
  )
  const allImages = props.data.images
  return (
    <Wrapper>
      <TaskWrapper>
        タスク名:{" "}
        <Link href={"http://localhost:1234/tasks/" + props.data._id}>
          {props.data.task}
        </Link>
        {" - "}縦分割数: {props.data.divide}
      </TaskWrapper>
      <h3>
        進捗:
        {getPercentage(clickedImages.length, allImages.length)}% (
        {clickedImages.length}枚/{allImages.length}枚中)
      </h3>
      <a
        href={"http://localhost:3333/progress?id=" + props.data._id}
        download={props.data.task + ".json"}
      >
        <DownloadButton>進捗ダウンロード(JSON)</DownloadButton>
      </a>
    </Wrapper>
  )
}
