import React from "react";
import styled from "styled-components";
import { getPercentage } from "./util";

const Wrapper = styled.div`
  border: 1px solid #d7dae2;
  border-radius: 4px;
  max-width: 750px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 80%;
  padding: 0 20px;
`;

const TaskWrapper = styled.h3`
  margin-right:auto;
`;

const AWrapper = styled.h3`
  margin-left:10px;
`;


const Button = styled.button`
  white-space: nowrap;
  cursor: pointer;
  :hover {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
  :active {
    color: #3a8ee6;
    border-color: #3a8ee6;
    outline: none;
  }
  border: 1px solid #dcdfe6;
  padding: 8px 10px;
  font-size: 12px;
  color: #606266;
  transition: 0.1s;
  font-weight: 500;
  border-radius: 4px;
`;

export const TaskItem = props => {
  const clickedImages = props.data.images.filter(
    item => item.regions.length > 0
  );
  const allImages = props.data.images;
  return (
    <Wrapper>
      <TaskWrapper>タスク名: {props.data.task}</TaskWrapper>
      <h3>
        進捗:
        {getPercentage(clickedImages.length, allImages.length)}% (
        {clickedImages.length}枚/{allImages.length}枚中)
      </h3>
      <AWrapper href={"http://localhost:3333/getResult?id=" + props.data._id} download={props.data.task + ".json"}>
        <Button>進捗ダウンロード(JSON)</Button>
      </AWrapper>
    </Wrapper>
  );
};
