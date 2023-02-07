import React, { useContext, useEffect, useState } from "react";
import { FaTrash, FaPen } from "react-icons/fa";
import Load from "./PerLoad";
import LoadsContext from "../../store/transactions-context";
import classes from "./LoadList.module.scss";
import SortButtons from "./SortButtons";
import PercentForm from "./PercentForm";
import ExpensesContext from "../../store/expenses-context";
import TotalMiles from "../BusinessOperations/TotalMiles";
import AverageRate from "../BusinessOperations/AverageRate";
import { LOCAL_LOADS } from "../../local-loads-data";
import {
  filterDataByWeek,
  groupByWeekMondayToSunday,
} from "../../lib/sorting-utils";
import { LOCAL_VAR_EXPENSES } from "../../local-expenses-data";

//import { filterMonthly, filterDailyWithinMonth } from "../../lib/sorting-utils";

const LoadList = () => {
  const { loads } = useContext(LoadsContext);
  const { dispacthFee } = useContext(ExpensesContext);

  //console.log(filterDataByWeek(LOCAL_VAR_EXPENSES));

  return (
    <section className={classes.transactions_container}>
      <div className={classes.loads_header}>
        <div className={classes.loads_header_left}>
          <h3>Loads</h3>
          <TotalMiles />
          <AverageRate />
        </div>
        <div className={classes.loads_header_right}>
          <PercentForm />
          <SortButtons loads={loads} />
        </div>
      </div>
      <div className={classes.scroll_table}>
        <table className={classes.table}>
          <thead>
            {/* <tr className={classes["table-header"]}> */}
            <th className={classes.td_from}>From</th>
            <th className={classes.td_to}>To</th>
            <th className={classes.td_note}>Note</th>
            <th className={classes.td_date}>Date</th>
            <th className={classes.td_miles}>Miles</th>
            <th className={classes.td_rate}>Rate</th>
            <th className={classes.td_amount}>Revenue</th>
            <th className={classes.td_netpay}>Net Pay</th>
            <th className={classes.td_trash}>
              <i>
                <FaTrash />
              </i>
            </th>
            <th className={classes.td_edit}>
              <i>
                <FaPen />
              </i>
            </th>
            {/* </tr> */}
          </thead>

          <tbody>
            {loads.map((load) => {
              return (
                <Load key={load.id} load={load} dispacthFee={dispacthFee} />
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default LoadList;
