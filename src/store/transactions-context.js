// import {
//   addDoc,
//   collection,
//   deleteDoc,
//   onSnapshot,
//   query,
//   doc,
//   updateDoc,
// } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
// import { db } from "../firebase";
import { sortBy } from "lodash";
// import axios from "axios";
import { LOCAL_LOADS, LOCAL_WEEKLY_FILTERED_LOADS } from "../local-loads-data";

import DateGenerator from "random-date-generator/src/DateGenerator";
import { uuidv4 } from "@firebase/util";
import {
  filterMonthly as filterDataMonthly,
  filterDataInGivenDateRange,
  sortKeyDateAsc,
} from "../lib/sorting-utils";

// const url =
//   "https://expense-tracker-aa0b3-default-rtdb.firebaseio.com/expenses.json";

const LoadsContext = React.createContext({
  loads: [],
  totalGross: 0,
  weeklyLoadsKeys: [],
  isEmptyLoads: false,
  weeklySortedLoads: {},
  getAllLoads: () => {},
  setLoadsInGivenDateRange: (beginDate, endDate) => {},
  setLoadsMonthly: (year, month) => {},
  addLoad: (expense) => {},
  setLoadsWeekly: (dateKey) => {},
  deleteLoad: (id) => {},
  updateLoad: (id, newData) => {},
  sortLoads: (sortedLoads) => {},
});

export const TransactionsContextProvider = (props) => {
  const [loads, setLoads] = useState([]);
  const [totalGross, setTotalGross] = useState(0);
  const [weeklyLoadsKeys, setWeeklyLoadsKeys] = useState([]);
  const [weeklySortedLoads, setWeeklySortedLoads] = useState({});
  const [isEmptyLoads, setIsEmptyLoads] = useState(false);

  useEffect(() => {
    setWeeklySortedLoads(LOCAL_WEEKLY_FILTERED_LOADS);
    const arrOfKeys = [];
    for (const key in LOCAL_WEEKLY_FILTERED_LOADS) {
      arrOfKeys.push(key);
    }

    const sortedKeys = sortKeyDateAsc(arrOfKeys);

    setWeeklyLoadsKeys(sortedKeys);
  }, []);

  // useEffect(() => {
  //   // setTotalGross(gross);
  //   //const transformedData = sortBy(LOCAL_LOADS, ["dateCreated"]);

  //   setLoads(transformedData);
  // }, []);

  //new type of data for loads - instead of rendering all loads
  //render only by weekly - default week will last week with loads
  useEffect(() => {
    const lastWeek = weeklySortedLoads[weeklyLoadsKeys[0]];

    if (lastWeek) {
      const { data } = lastWeek;

      const sortedData = sortBy(data, ["dateCreated"]);
      setLoads(sortedData);
    }
  }, [weeklySortedLoads, weeklyLoadsKeys]);

  useEffect(() => {
    const gross = loads.reduce((acc, el) => {
      acc += +el.amount;
      return acc;
    }, 0);

    setTotalGross(gross);
  }, [loads]);

  const setLoadsInGivenDateRange = (beginDate, endDate) => {
    const filteredLoadsInRange = filterDataInGivenDateRange(
      LOCAL_LOADS,
      beginDate,
      endDate
    );
    if (filteredLoadsInRange) {
      setIsEmptyLoads(false);
      setLoads(filteredLoadsInRange);
    } else {
      alert("No Loads");
      setIsEmptyLoads(true);
      return;
    }
  };

  //filter by chosen month and year;
  const setLoadsMonthly = (year, month) => {
    const monthlyLoads = filterDataMonthly(LOCAL_LOADS, year, month);
    if (monthlyLoads) {
      setLoads(monthlyLoads);
      setIsEmptyLoads(false);
      return true;
    } else {
      alert("No Loads");
      setIsEmptyLoads(true);
      return false;
    }
  };

  //filter loads weekly
  const setLoadsWeekly = (dateKey) => {
    const weeklyLoads = weeklySortedLoads[dateKey];

    const { data } = weeklyLoads;

    setLoads(data);
  };

  const getAllLoads = () => {
    setLoads(LOCAL_LOADS);
  };

  //add load
  const addLoad = async (newLoad) => {
    setLoads((prevState) => [newLoad, ...prevState]);
  };

  const deleteLoad = async (id) => {
    const arr = loads.filter((load) => load.id !== id);

    setLoads(arr);
  };

  const sortLoads = (sortedLoads) => {
    setLoads(sortedLoads);
  };

  const updateLoad = async (id, newData) => {
    // await updateDoc(doc(db, "loads", id), newData);
    const updatedLoads = loads.map((load) => {
      if (load.id !== id) {
        return load;
      } else if (load.id === id) {
        return newData;
      }
    });

    setLoads(updatedLoads);
  };

  const contextValue = {
    loads,
    addLoad,
    setLoadsWeekly,
    setLoadsInGivenDateRange,
    setLoadsMonthly,
    deleteLoad,
    getAllLoads,
    updateLoad,
    sortLoads,
    isEmptyLoads,
    totalGross,
    weeklyLoadsKeys,
    weeklySortedLoads,
  };

  return (
    <LoadsContext.Provider value={contextValue}>
      {props.children}
    </LoadsContext.Provider>
  );
};

export default LoadsContext;

const randomLoadGenerator = () => {
  let startDate = new Date(2022, 0, 1);
  let endDate = new Date(2023, 1, 3);
  const arrOfRandomLoads = [];
  for (let i = 0; i < 150; i++) {
    const date = DateGenerator.getRandomDateInRange(startDate, endDate);
    const amount = Math.floor(Math.random() * 3000 + 1000);
    const miles = Math.floor(Math.random() * 1000 + 400);
    const rate = (amount / miles).toFixed(2);
    const newLoad = {
      dateCreated: date,
      amount: amount,
      id: uuidv4(),
      note: "Random",
      miles: miles,
      rate: +rate,
      from: "Texas",
      destination: "CA LA",
    };

    arrOfRandomLoads.push(newLoad);
  }
  console.log(arrOfRandomLoads);
  return arrOfRandomLoads;
};

//randomLoadGenerator();
