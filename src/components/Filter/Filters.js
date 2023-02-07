import React, { useState } from "react";
import FilterByMonth from "./FilterByMonth";
import FilterInDateRange from "./FilterInDateRange";

import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import classes from "./Filter.module.scss";
import FilterWeekly from "./FilterWeekly";
import AllData from "./AllData";
const Filters = () => {
  const [showInRange, setShowInRange] = useState(false);

  return (
    <>
      <FilterByMonth />

      <button
        className={classes.btn_search_dates}
        onClick={() => {
          setShowInRange(!showInRange);
        }}
      >
        Filter By Dates{" "}
        {!showInRange ? (
          <span>
            <FaArrowCircleRight />
          </span>
        ) : (
          <span>
            <FaArrowCircleLeft />
          </span>
        )}
      </button>
      {showInRange && <FilterInDateRange />}

      {!showInRange && <FilterWeekly />}
      <AllData />
    </>
  );
};

export default Filters;
