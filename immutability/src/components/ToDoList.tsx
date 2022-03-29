import React, {useRef, useState} from 'react';
import ToDo from "./ToDo";
import styled from "styled-components";

const Container =styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: wheat;
  font-size: 24px;

`
const toDoList = [
  {
    id: 1,
    task: "Check list",
    isComplete: false,
  },
  {
    id: 2,
    task: "Stroll outside",
    isComplete: false
  },
  {
    id: 3,
    task: "Buy a ticket",
    isComplete: false,
  }
]
function ToDoList() {
  const [toDos, setToDos] = useState(toDoList);
  const [input, setInput] = useState("");
  const inputRef = useRef<number>(4);
  const onDelete = (id:number) => {
    setToDos(toDos.filter(item => item.id !== id));
  };

  const onAdd = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const toDo= {
      id: inputRef.current,
      task: input,
      isComplete: false,
    }
    setToDos([...toDos, toDo]);
    setInput("");
    inputRef.current += 1;
  };
  const onEdit = (id:number) => {
    setToDos(
      toDos.map(toDo =>
        toDo.id === id ? {...toDo, isComplete: !toDo.isComplete} : toDo
      )
    );
  };
  const onChange = (event:React.FormEvent<HTMLInputElement>) => {
    const {currentTarget: {value}} = event;
    setInput(value);
  }
  return (
    <Container>
      <form onSubmit={onAdd}>
        <input type="text" onChange={onChange} value={input} placeholder="What do you do?" />
        <button>Add</button>
      </form>
      {
        toDos.map((item) => {
          return <ToDo onDelete={onDelete} onEdit={onEdit}  {...item}/>
          }
        )
      }
    </Container>
  );
}

export default ToDoList;