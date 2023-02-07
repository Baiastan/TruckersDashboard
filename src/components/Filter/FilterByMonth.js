import React, { useContext, useState } from "react";
import { currentMonth, currentYear, months } from "../../lib/default-data";
import classes from "./Filter.module.scss";
import LoadsContext from "../../store/transactions-context";
import ExpensesContext from "../../store/expenses-context";

const FilterByMonth = () => {
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const { setLoadsMonthly } = useContext(LoadsContext);
  const { setExpensesMonthly } = useContext(ExpensesContext);

  const handleSubmit = (e) => {
    const month = +e.target.value;
    const isTrue = setLoadsMonthly(year, month);

    //console.log(isNull);
    if (!isTrue) {
      return;
    }

    setExpensesMonthly(year, month);
    setMonth(+e.target.value);
  };

  return (
    <div className={classes.monthly_wrapper}>
      <div className={classes.controls}>
        <div>
          <label htmlFor="year">Year</label>
          <select
            id="year"
            onChange={(e) => setYear(+e.target.value)}
            defaultValue={year}
          >
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
        </div>
      </div>
      <div className={classes.controls}>
        <div>
          <label htmlFor="month">Month</label>
          <select id="month" onChange={handleSubmit} defaultValue={month}>
            {months.map((month, index) => (
              <option value={index} key={`month-${index}`}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterByMonth;
