import React, { useContext, useState } from "react";
import Expenses from "../Expenses/Expenses";
import classes from "./DataSummary.module.scss";

import DoughnutData from "./DoughnutData";
import ExpensesData from "./ExpensesData";
import BusinessSummaryResults from "../BusinessOperations/BusinessSummaryResults";

import Filters from "../Filter/Filters";
import ExpensesContext from "../../store/expenses-context";

import Rates from "./Rates";
import LoadsContext from "../../store/transactions-context";

const DataSummary = () => {
  const { isExpenses } = useContext(ExpensesContext);
  const { isEmptyLoads } = useContext(LoadsContext);
  const [showRates, setShowRates] = useState(false);
  return (
    <div className={classes.data_summary_container}>
      <BusinessSummaryResults />
      <div className={classes.filters_wrapper}>
        <Filters />
      </div>
      <div className={classes.charts_wrapper}>
        <div className={classes.pie_chart}>
          <DoughnutData />
        </div>
        <div className={classes.line_bar_charts}>
          <button
            className={classes.btn_line_bar_toggle}
            onClick={() => setShowRates((prevState) => !prevState)}
          >
            {showRates ? "See Expenses" : "See Rates"}
          </button>
          {showRates ? (
            <Rates />
          ) : isExpenses ? (
            <ExpensesData />
          ) : (
            <h2>No Daily Expenses</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataSummary;
