import React, { useContext, useState } from "react";
import ExpensesContext from "../../../store/expenses-context";
import ExpenseItem from "./ExpenseItem";
import classes from "./ExpenseList.module.scss";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
//import { CSSTransition } from "react-transition-group";
import CSSTransition from "react-transition-group/CSSTransition";

const ExpensesList = () => {
  const ctxExpense = useContext(ExpensesContext);
  const [showExpenses, setShowExpenses] = useState(false);

  const handleSlideClick = () => {
    setShowExpenses(!showExpenses);
  };

  //let slideDownUp = showExpenses ? "slide_down" : "slide_up";

  return (
    <div className={classes.var_expenses_container}>
      <div className={classes.header} onClick={handleSlideClick}>
        <h3>Daily Expenses</h3>
        <button onClick={handleSlideClick}>
          {!showExpenses && <FaChevronDown />}
          {showExpenses && <FaChevronUp />}
        </button>
      </div>

      {showExpenses && (
        <div className={classes.scroll_table}>
          <table>
            <thead>
              <th>Category</th>
              <th>Notes</th>
              <th>Amount</th>
            </thead>
            <tr>
              <td style={{ fontWeight: "bolder" }}>Total:</td>
              <td></td>
              <td style={{ fontWeight: "bolder", textAlign: "right" }}>
                ${ctxExpense.totalVar}
              </td>
            </tr>
            {ctxExpense.variableExp.map((expense) => (
              <ExpenseItem
                amount={expense.amount}
                notes={expense.notes}
                category={expense.category}
                key={expense.id}
                id={expense.id}
              />
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default ExpensesList;
