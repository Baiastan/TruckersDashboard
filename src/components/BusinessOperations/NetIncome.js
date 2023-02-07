import React, { useContext, useEffect, useState } from "react";
import LoadsContext from "../../store/transactions-context";
import ExpensesContext from "../../store/expenses-context";
import classes from "./BusinessSummaryResults.module.scss";

const NetIncome = () => {
  const { totalGross } = useContext(LoadsContext);
  const { totalFix, totalFee, totalVar } = useContext(ExpensesContext);
  const [netIncome, setNetIncome] = useState(0);

  useEffect(() => {
    setNetIncome(totalGross - totalVar - totalFix - totalFee);
  }, [totalFee, totalFix, totalGross, totalVar]);

  let color = "lightgreen";

  if (netIncome < 0) {
    color = "tomato";
  }

  return (
    <div className={classes.net_income}>
      <span>Net Income |</span>
      <span style={{ color: color }}>${netIncome}</span>
    </div>
  );
};

export default NetIncome;
