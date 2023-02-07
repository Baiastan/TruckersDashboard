import React from "react";
import NetIncome from "./NetIncome";
import TotalExpenses from "./TotalExpenses";
import TotalGross from "./TotalGross";

import classes from "./BusinessSummaryResults.module.scss";
import Expenses from "../Expenses/Expenses";

const BusinessSummaryResults = () => {
  return (
    <div className={classes.business_summary_header}>
      <div className={classes.business_summary}>
        <TotalGross />
        <TotalExpenses />
        <NetIncome />
      </div>
      <Expenses />
    </div>
  );
};

export default BusinessSummaryResults;
