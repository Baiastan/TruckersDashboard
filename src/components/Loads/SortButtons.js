import React, { useContext } from "react";
import classes from "./SortButtons.module.scss";
import LoadsContext from "../../store/transactions-context";
import { sortLoadsBy } from "../../lib/sorting-utils";

const SortButtons = () => {
  const { loads, sortLoads } = useContext(LoadsContext);

  const handleSort = (e) => {
    const by = e.target.value;
    if (by === "0") {
      return;
    }
    const sortedLoads = sortLoadsBy(loads, by);

    sortLoads(sortedLoads);
  };

  return (
    <div className={classes["sort-list"]}>
      <select onChange={handleSort} name="sort" id="sort">
        <option value="0">Sort By</option>
        <option value="ascRate">Lowest Rate</option>
        <option value="descRate">Highest Rate</option>
        <option value="ascAmount">Lowest Amount</option>
        <option value="descAmount">Highest Amount</option>
        <option value="ascDate">Oldest</option>
        <option value="descDate">Newest</option>
      </select>
    </div>
  );
};

export default SortButtons;
