import React, { useContext, useState } from "react";
import classes from "./Filter.module.scss";

import { FcSearch } from "react-icons/fc";
import LoadsContext from "../../store/transactions-context";
import ExpensesContext from "../../store/expenses-context";

const FilterInDateRange = () => {
  const [beginDate, setBeginDate] = useState(0);
  const [endDate, setEndDate] = useState(0);
  const { setLoadsInGivenDateRange } = useContext(LoadsContext);
  const { setExpensesInGivenDateRange } = useContext(ExpensesContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoadsInGivenDateRange(beginDate, endDate);
    setExpensesInGivenDateRange(beginDate, endDate);
  };

  return (
    <div className={classes.range_wrapper}>
      <form className={classes.form_in_range} onSubmit={handleSubmit}>
        <div className={classes.controls}>
          <div>
            <label htmlFor="begin-date">Start Date</label>
            <input
              id="begin-date"
              type="date"
              onChange={(e) => setBeginDate(e.target.value)}
            />
          </div>
        </div>

        <div className={classes.controls}>
          <div>
            <label htmlFor="end-date">End Date</label>
            <input
              id="end-date"
              type="date"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <button className={classes.btn_in_range} type="submit">
          <FcSearch />
        </button>
      </form>
    </div>
  );
};

export default FilterInDateRange;
