import React, { useState } from "react";
import classes from "../page-styles/ExpenseTrackerPage.module.scss";

import LoadList from "../components/Loads/LoadList";
import AddLoadForm from "../components/Loads/AddLoadForm";

import AddFixedExpenseForm from "../components/Expenses/FixedExpenses/AddFixedExpenseForm";
import ToggleButton from "../components/UtilComponents/ToggleButton";
import DataSummary from "../components/Charts/DataSummary";
import DailyExpenseForm from "../components/Expenses/VariableExpenses/DailyExpenseForm";

const ExpenseTrackerPage = () => {
  const [addLoad, setAddLoad] = useState(false);
  const [addFixedExp, setFixedExp] = useState(false);
  const [addExpense, setAddExpense] = useState(false);

  return (
    <section className={classes["main-page"]}>
      <div className={classes["left-nav"]}>
        <ToggleButton text="Add Load" toggle={setAddLoad} />
        {addLoad && <AddLoadForm />}

        <ToggleButton text="Add Fixed Expense" toggle={setFixedExp} />

        {addFixedExp && <AddFixedExpenseForm />}
        <ToggleButton text="Add expense" toggle={setAddExpense} />
        {addExpense && <DailyExpenseForm />}
      </div>
      <div className={classes["right-nav"]}>
        <section className={classes.charts_expenses_container}>
          <DataSummary />
        </section>

        <LoadList />
      </div>
    </section>
  );
};

export default ExpenseTrackerPage;
