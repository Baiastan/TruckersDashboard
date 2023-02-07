import React, { useContext, useEffect, useState } from "react";
import ExpensesContext from "../../../store/expenses-context";
import FixExpenseItem from "./FixExpenseItem";
import classes from "./FixExpenseList.module.scss";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import LoadsContext from "../../../store/transactions-context";
const FixExpenseList = () => {
  const ctxExpense = useContext(ExpensesContext);
  const [showExpenses, setShowExpenses] = useState(false);

  const handleSlideClick = () => {
    setShowExpenses(!showExpenses);
  };

  let slideDownUp = showExpenses ? "slide_down" : "slide_up";

  return (
    <div className={classes.fix_expenses_container}>
      <div className={classes.header} onClick={handleSlideClick}>
        <h3>Fixed Expenses</h3>
        <button onClick={handleSlideClick}>
          {!showExpenses && <FaChevronDown />}
          {showExpenses && <FaChevronUp />}
        </button>
      </div>
      {showExpenses ? (
        <div className={`${classes.scroll_table} ${classes[slideDownUp]}`}>
          <table>
            <thead>
              <th>Title</th>
              <th style={{ textAlign: "right" }}>Amount</th>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: "bolder" }}>Total:</td>

                <td style={{ fontWeight: "bolder", textAlign: "right" }}>
                  ${ctxExpense.totalFix}
                </td>
              </tr>
              {/* <tr>
              <td>Dispatch Fee</td>
              <td style={{ color: "tomato", textAlign: "right" }}>
                {totalFee}
              </td>
            </tr> */}
              {ctxExpense.fixedExp.map((expense) => (
                <FixExpenseItem
                  amount={expense.amount}
                  title={expense.title}
                  key={expense.id}
                  id={expense.id}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default FixExpenseList;
