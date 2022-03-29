import React from 'react';
import styled from "styled-components";

const ToDoBox = styled.div`
  display: flex;
`

interface IToDO {
  id: number,
  task: string,
  isComplete: boolean;
  onDelete: (id:number) => void
  onEdit: (id: number) => void
}

function ToDo({id, task, isComplete,onDelete, onEdit}:IToDO) {

  return (
    <ToDoBox onClick={() => onEdit(id)}>
        <span style={{color: isComplete ? "black" : "green"}}>
          {
            task
          }
        </span>
      <button onClick={() => onDelete(id)}>
        Done!
      </button>
    </ToDoBox>
  );
}

export default ToDo;