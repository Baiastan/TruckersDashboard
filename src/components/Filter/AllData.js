import React, { useContext } from "react";
import ExpensesContext from "../../store/expenses-context";
import LoadsContext from "../../store/transactions-context";
import classes from "./Filter.module.scss";

const AllData = () => {
  const { getAllLoads } = useContext(LoadsContext);
  const { getAllExpenses } = useContext(ExpensesContext);

  const handleClick = () => {
    getAllExpenses();
    getAllLoads();
  };

  return (
    <div className={classes.all_data}>
      <button onClick={handleClick}>All Loads</button>
    </div>
  );
};

export default AllData;
