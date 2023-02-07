import React, { useState } from "react";

import classes from "./Expenses.module.scss";
import FixExpenseList from "./FixedExpenses/FixExpenseList";
import ExpensesList from "./VariableExpenses/ExpenseList";

const Expenses = () => {
  return (
    <div className={classes.expenses_block}>
      <ExpensesList />
      <FixExpenseList />
    </div>
  );
};

export default Expenses;
