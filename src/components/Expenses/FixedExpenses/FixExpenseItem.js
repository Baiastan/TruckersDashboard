import React, { useContext } from "react";
import ExpensesContext from "../../../store/expenses-context";
import classes from "./FixExpenseItem.module.scss";
const FixExpenseItem = ({ title, amount, id }) => {
  const ctxExpense = useContext(ExpensesContext);

  const handleClick = () => {
    ctxExpense.deleteExpense(id, "fixed-expenses");
  };

  return (
    <tr
      className={classes.expense_item}
      onDoubleClick={handleClick}
      title="Double click to Delete"
    >
      <td>{title}</td>
      <td style={{ color: "tomato", textAlign: "right" }}>{amount}</td>
    </tr>
  );
};

export default FixExpenseItem;
