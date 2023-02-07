import React, { useContext } from "react";
import ExpensesContext from "../../store/expenses-context";
import classes from "./BusinessSummaryResults.module.scss";
const TotalExpenses = () => {
  const { totalFee, totalFix, totalVar } = useContext(ExpensesContext);

  return (
    <div className={classes.total_expenses}>
      <span>Total Expenses |</span>
      <span>${totalFee + totalFix + totalVar}</span>
    </div>
  );
};

export default TotalExpenses;
