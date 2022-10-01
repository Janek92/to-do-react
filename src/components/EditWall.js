import React, { useState, useRef, useEffect } from "react";
import classes from "./EditWall.module.css";
import Input from "./UI/Input";
import Button from "./UI/Button";

const EditWall = (props) => {
  const val = useRef("");
  const [valFromEdited, setValFromEdited] = useState("");

  useEffect(() => {
    val.current.focus();
  }, []);

  useEffect(() => {
    props.onNewName(val.current.value);
  }, [valFromEdited]);

  const receiveVal = async () => {
    await setValFromEdited(val.current.value);
    props.onClose();
  };

  return (
    <div className={classes["edit-wall"]}>
      <div>
        <Input maxlength="22" value={props.value} ref={val} />
        <Button onClick={receiveVal}>OK</Button>
        <Button onClick={props.onClose}>Anuluj</Button>
      </div>
    </div>
  );
};

export default EditWall;
