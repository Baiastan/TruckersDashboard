import React, { useContext } from "react";
import ExpensesContext from "../../../store/expenses-context";
import classes from "./ExpenseItem.module.scss";
const ExpenseItem = ({ amount, category, notes, className, id }) => {
  const ctxExpense = useContext(ExpensesContext);
  const handleDelete = () => {
    ctxExpense.deleteExpense(id, "variable-expenses");
  };

  return (
    <tr
      className={classes.expense_item}
      onDoubleClick={handleDelete}
      title="Double Click to Delete"
    >
      <td>{category}</td>
      <td>{notes}</td>
      <td style={{ color: "tomato", textAlign: "right" }}>${amount}</td>
    </tr>
  );
};

export default ExpenseItem;
