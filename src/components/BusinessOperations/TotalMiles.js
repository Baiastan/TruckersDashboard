import React, { useContext, useEffect, useState } from "react";
import LoadsContext from "../../store/transactions-context";
import classes from "../Loads/LoadList.module.scss";
const TotalMiles = () => {
  const [totalMiles, setTotalMiles] = useState(0);
  const { loads } = useContext(LoadsContext);
  //const {miles} = loads;

  useEffect(() => {
    const miles = loads.reduce((acc, load) => (acc += +load.miles), 0);

    setTotalMiles(miles);
    console.log(
      "useEffect in Total Miles > Business Operations -- need to fix"
    );
  }, [loads]);

  return (
    <div className={classes.total_miles}>
      <span>Total Miles |</span>
      <span>{totalMiles} mi</span>
    </div>
  );
};

export default TotalMiles;
