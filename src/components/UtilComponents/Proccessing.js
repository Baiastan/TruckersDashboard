import React, { useEffect } from "react";
import classes from "./Proccessing.module.scss";

const Proccessing = ({ isLoading, setIsLoading }) => {
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    console.log("UseEffect");
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <div className={classes["proccessing-container"]}>
          <div className={classes.proccessing}></div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Proccessing;
