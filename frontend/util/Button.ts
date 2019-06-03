import styled from "styled-components"

export const Button = styled.button`
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
  :disabled {
    color: #c0c4cc;
    cursor: not-allowed;
    background-image: none;
    background-color: #fff;
    border-color: #ebeef5;
  }
  border: 1px solid #dcdfe6;
  padding: 8px 10px;
  font-size: 12px;
  color: #606266;
  transition: 0.1s;
  font-weight: 500;
  border-radius: 4px;
`
