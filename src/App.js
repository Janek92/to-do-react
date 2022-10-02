import React, { useState, useRef, useEffect } from "react";
import Input from "./components/UI/Input";
import Button from "./components/UI/Button";
import TasksWall from "./components/TasksPreview/TasksWall";
import EditWall from "./components/EditWall";

function App() {
  //Pobranie zadań z localStorage:
  let toDoFromLS = JSON.parse(localStorage.getItem("toDo"));
  toDoFromLS === null ? (toDoFromLS = []) : (toDoFromLS = toDoFromLS);

  const [toDo, setToDo] = useState([...toDoFromLS]);
  const [task, setTask] = useState({});
  const inputAddRef = useRef();
  const [editField, setEditField] = useState(false);
  const [valueToEdit, setValueToEdit] = useState("");
  const [searchText, setSearchText] = useState("");

  //Aktualizacja zadań w lS na zmiane w state'cie toDo
  useEffect(() => {
    localStorage.setItem("toDo", JSON.stringify(toDo));
  }, [toDo]);

  //Wartość zmiennej z inputa:
  const inputHandler = (e) => {
    setTask(e.target.value);
  };

  //Dodanie obiektu z zadaniem:
  const buttonHandler = () => {
    if (
      inputAddRef.current.value === "" ||
      toDo.some((el) => el.name === task)
    ) {
      return;
    }
    setToDo((prevToDo) => {
      return [...prevToDo, { name: task, done: false }];
    });
    inputAddRef.current.value = "";
  };

  //Usunięcie obiektu z zadaniem:
  const removeButtonHandler = (e) => {
    const name = e.target.parentElement.firstChild.textContent;
    setToDo(toDo.filter((item) => item.name !== name));
  };

  //Dodanie klucza z info o zaznaczeniu:
  const marked = (e) => {
    const name = e.target.parentElement.firstChild.textContent;
    const toMark = toDo.filter((el) => el.name === name);
    toMark[0].done = !toMark[0].done;
    setToDo((prevToDo) => {
      const index = prevToDo.findIndex((el) => el.name === name);
      prevToDo.splice(index, 1, ...toMark);
      return [...prevToDo];
    });
  };

  //Edycja zadania
  const editTask = (e) => {
    setEditField(true);
    const name = e.target.parentElement.firstChild.textContent;
    setValueToEdit(name);
  };

  //Zamknięcie EditWall bez zmiany tekstu task'a:
  const closeWall = () => {
    setEditField(false);
  };

  //Zmiana tekstu task'a:
  const getNewName = (val) => {
    const index = toDo.findIndex((value) => value.name === valueToEdit);
    const toChange = toDo.filter((el) => el.name === valueToEdit);
    setToDo((prevToDo) => {
      toChange[0].name = val;
      prevToDo.splice(index, 1, ...toChange);
      return [...prevToDo];
    });
  };

  const searchTask = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <React.Fragment>
      {editField && (
        <EditWall
          value={valueToEdit}
          onClose={closeWall}
          onNewName={getNewName}
        />
      )}
      <Input
        onChange={inputHandler}
        ref={inputAddRef}
        maxlength="22"
        type="text"
        placeholder="wpisz zadanie"
      />
      <Button onClick={buttonHandler}>DODAJ</Button>
      <Input onChange={searchTask} placeholder="wyszukaj" />
      <TasksWall
        toDo={toDo}
        onRemove={removeButtonHandler}
        onMarked={marked}
        onEdit={editTask}
        search={searchText}
      />
    </React.Fragment>
  );
}

export default App;
