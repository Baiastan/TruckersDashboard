import React, { useCallback, useContext, useEffect, useState } from "react";
import BarChart from "./BarChart";
import ExpensesContext from "../../store/expenses-context";

const COLORS = ["tomato", "green", "orange", "salmon", "lightblue", "blue"];

const ExpensesData = () => {
  const { variableExp, categories } = useContext(ExpensesContext);
  const [expCategory, setExpCategory] = useState({});
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    const keys = Object.keys(expCategory);

    const data = keys.map((key, index) => {
      return {
        name: key,
        value: expCategory[key],
        color: COLORS[index]
          ? COLORS[index]
          : `${
              "#" +
              (((1 << 24) * Math.random()) | 0).toString(16).padStart(6, "0")
            }`,
      };
    });

    setBarData(data);

    console.log("useEffect in Expenses Data 1");
  }, [expCategory]);

  const getTotalByCategory = useCallback(
    (expenses) => {
      const obj = {};
      for (const expense of expenses) {
        if (!obj.hasOwnProperty(expense.category)) {
          obj[expense.category] = +expense.amount;
        } else {
          obj[expense.category] += +expense.amount;
        }
      }

      return obj;
    },
    [categories, variableExp]
  );

  useEffect(() => {
    const obj = getTotalByCategory(variableExp);
    setExpCategory(obj);
    console.log("useEffect in Expenses Data 2");
  }, [getTotalByCategory]);

  return <BarChart data={barData} />;
};

export default ExpensesData;
