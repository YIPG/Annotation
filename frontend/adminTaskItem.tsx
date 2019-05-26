import React from "react";
import styled from "styled-components";
import { getPercentage } from "./util";

const Wrapper = styled.div`
  border: 1px solid #d7dae2;
  border-radius: 4px;
  max-width: 750px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
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
      <h3>タスク名: {props.data.task}</h3>
      <h3>
        進捗:
        {getPercentage(clickedImages.length, allImages.length)}% (
        {clickedImages.length}枚/{allImages.length}枚中)
      </h3>
      <a href="">
        <Button>進捗ダウンロード(JSON)</Button>
      </a>
    </Wrapper>
  );
};
