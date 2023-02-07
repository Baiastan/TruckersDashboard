import React, { useContext } from "react";
import LoadsContext from "../../store/transactions-context";
import classes from "./BusinessSummaryResults.module.scss";
const TotalGross = () => {
  const { totalGross } = useContext(LoadsContext);

  return (
    <div className={classes.total_gross}>
      <span>Total Gross |</span>
      <span>${totalGross}</span>
    </div>
  );
};

export default TotalGross;
