import React, { useContext, useEffect, useState } from "react";
import LoadsContext from "../../store/transactions-context";
import classes from "../Loads/LoadList.module.scss";
const AverageRate = () => {
  const [averageRate, setAverageRate] = useState(0);
  const { loads } = useContext(LoadsContext);

  useEffect(() => {
    const rate = loads.reduce((acc, load) => (acc += +load.rate), 0);

    setAverageRate((rate / loads.length).toFixed(2));
    console.log(
      "useEffect in Average Rate > Business Operations - need to fix"
    );
  }, [loads]);

  return (
    <div className={classes.average_rate}>
      <span>Average Rate |</span>
      <span>${averageRate}</span>
    </div>
  );
};

export default AverageRate;
