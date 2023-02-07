import React, { useState } from "react";
import classes from "./ToggleButton.module.scss";

const ToggleButton = (props) => {
  const [isDone, setIsDone] = useState(false);

  const handleClick = () => {
    const toggle = props.toggle;

    toggle((prevState) => !prevState);
    setIsDone((prevState) => !prevState);
  };
  return (
    <div className={classes.toggle}>
      <button className={classes.button} onClick={handleClick}>
        {!isDone ? props.text : "Done"}
      </button>
    </div>
  );
};

export default ToggleButton;
