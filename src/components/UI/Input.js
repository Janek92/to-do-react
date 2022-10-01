import React from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  const classNames = `${classes.input} ${props.className}`;
  return (
    <input
      className={classNames}
      onChange={props.onChange}
      ref={ref}
      type={props.type}
      defaultValue={props.value}
      placeholder={props.placeholder}
      maxLength={props.maxlength}
    />
  );
});

export default Input;
