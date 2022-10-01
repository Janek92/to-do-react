import classes from "./TasksWall.module.css";
import NoTasksWarning from "./NoTasksWarning";
import React from "react";
import { MdDone } from "react-icons/md";
import { RiArrowGoBackLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

const TasksWall = (props) => {
  //Metoda zwracająca false jeśli toDo lub wynik filtrowania toDo jest równy 0

  const tasksOnWall = () => {
    if (
      props.toDo.length === 0 ||
      props.toDo.filter((task) => task.name.includes(props.search)).length === 0
    ) {
      return false;
    }
    return true;
  };

  return (
    <div className={classes.wall}>
      {(!tasksOnWall() && <NoTasksWarning />) || (
        <ul className={classes.tasks}>
          {props.toDo.map((task, index) => {
            if (task.name.includes(props.search)) {
              const icon = task.done ? (
                <RiArrowGoBackLine style={{ color: "red" }} />
              ) : (
                <MdDone />
              );

              return (
                <li className={(task.done && classes.done) || ""} key={index}>
                  {task.name}
                  <button onClick={props.onRemove}>
                    <AiOutlineDelete />
                  </button>
                  <button onClick={props.onEdit}>
                    <FiEdit />
                  </button>
                  <button onClick={props.onMarked}>{icon}</button>
                </li>
              );
            }
          })}
        </ul>
      )}
    </div>
  );
};

export default TasksWall;
