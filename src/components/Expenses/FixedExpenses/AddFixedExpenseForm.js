import React, { useContext, useRef, useState } from "react";
import {
  validateNumberInput,
  validateStringInput,
} from "../../../lib/validation-utils";
import classes from "./AddFixedExpenseForm.module.scss";

import ExpensesContext from "../../../store/expenses-context";
import Proccessing from "../../UtilComponents/Proccessing";
import { uniqueId } from "lodash";

const AddFixedExpenseForm = () => {
  const titleInput = useRef();
  const amountInput = useRef();
  const [type, setType] = useState("weekly");
  const ctx = useContext(ExpensesContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const enteredTitle = titleInput.current.value;
    const enteredAmount = amountInput.current.value;
    const isStrValid = validateStringInput(enteredTitle);
    const isAmountValid = validateNumberInput(enteredAmount);

    if (!isStrValid) {
      alert("Desc cannot be empty");
      titleInput.current.focus();
      return;
    }

    if (!isAmountValid) {
      alert("Amount cannot be empty or negative");
      amountInput.current.focus();
      return;
    }

    ctx.addExpense(
      {
        title: enteredTitle,
        type: type,
        id: uniqueId(),
        dateCreated: new Date(),
        amount: enteredAmount,
      },
      "fixed-expenses"
    );
    setIsLoading(true);
    titleInput.current.value = "";
    amountInput.current.value = "";
    titleInput.current.focus();
  };

  return (
    <section className={classes["fixed-expense-form"]}>
      <Proccessing isLoading={isLoading} setIsLoading={setIsLoading} />
      <form onSubmit={handleSubmit}>
        <div className={classes["form-control"]}>
          <label htmlFor="text">Title</label>
          <input type="text" id="text" ref={titleInput} autoFocus />
        </div>
        <div className={classes["form-control"]}>
          <label htmlFor="amount">Amount</label>
          <input type="number" id="amount" ref={amountInput} placeholder="$" />
        </div>
        <div
          className={classes["form-radio-buttons"]}
          onChange={(e) => setType(e.target.value)}
        >
          <div>
            <label htmlFor="monthly">Monthly</label>
            <input type="radio" id="monthly" value="montly" name="type" />
          </div>
          <div>
            <label htmlFor="weekly">Weekly</label>
            <input
              type="radio"
              id="weekly"
              name="type"
              value="weekly"
              defaultChecked
            />
          </div>
        </div>
        <button className={classes.button}>Add Fixed Expense</button>
      </form>
    </section>
  );
};

export default AddFixedExpenseForm;
