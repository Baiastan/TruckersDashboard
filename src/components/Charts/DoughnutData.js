import React, { useContext, useEffect, useState } from "react";

import ExpensesContext from "../../store/expenses-context";
import LoadsContext from "../../store/transactions-context";
import DoughnutCh from "./DoughnutCh";

const DoughnutData = () => {
  const { totalFix, totalVar, dispacthFee, totalFee } =
    useContext(ExpensesContext);
  const { totalGross } = useContext(LoadsContext);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    let netIncome = totalGross - totalFix - totalVar - totalFee;
    const totalExpenses = totalFix + totalVar;

    let data;

    if (netIncome < 0) {
      netIncome = 0;
      data = [
        {
          name: "Total Expenses",
          value: totalExpenses,
          color: "tomato",
        },

        {
          name: "Dispatch Fee",
          value: totalFee,
          color: "orange",
        },
      ];
    } else {
      data = [
        {
          name: "Net Income",
          value: netIncome,
          color: "green",
        },
        {
          name: "Total Expenses",
          value: totalExpenses,
          color: "tomato",
        },

        {
          name: "Dispatch Fee",
          value: totalFee,
          color: "orange",
        },
      ];
    }

    setPieData(data);
  }, [totalFix, totalGross, totalVar, dispacthFee, totalFee]);

  return <DoughnutCh chartData={pieData} />;
};

export default DoughnutData;
