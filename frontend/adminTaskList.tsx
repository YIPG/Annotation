import React from "react";
import styled from "styled-components";
import { TaskItem } from "./adminTaskItem";

export const TaskList = props => {
  return props.data.map(d => <TaskItem key={d.task} data={d} />);
};
