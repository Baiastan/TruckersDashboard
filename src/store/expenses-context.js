import { createContext, useContext, useEffect, useState } from "react";

import { sortBy, startCase } from "lodash";
import LoadsContext from "./transactions-context";
import DateGenerator from "random-date-generator/src/DateGenerator";
import { uuidv4 } from "@firebase/util";
import {
  LOCAL_VAR_EXPENSES,
  LOCAL_FIXED_EXPENSES,
  LOCAL_WEEKLY_FILTERED_EXPENSES,
} from "../local-expenses-data";
import {
  filterMonthly,
  filterDataInGivenDateRange,
  calculateFixedExp,
} from "../lib/sorting-utils";

const ExpensesContext = createContext({
  fixedExp: [],
  variableExp: [],
  categories: [],
  dispacthFee: 0,
  isExpenses: true,
  totalFee: 0,
  totalFix: 0,
  totalVar: 0,
  weeklyExpenses: {},
  getAllExpenses: () => {},
  setExpensesWeekly: (dateKey) => {},
  setExpensesInGivenDateRange: (beginDate, endDate) => {},
  setExpensesMonthly: (year, month) => {},
  setNewDispatchFee: (percent) => {},
  addExpense: (expense, dbName) => {},
  deleteExpense: (id, dbName) => {},
  addNewCategory: (newCategory) => {},
});

export const ExpensesContextProvider = (props) => {
  const { totalGross } = useContext(LoadsContext);
  const [fixedExp, setFixedExp] = useState([]);
  const [variableExp, setVariableExp] = useState([]);
  const [categories, setCategories] = useState([
    "Fuel",
    "Food",
    "Maintenance",
    "Travel",
    "CoDriver",
    "Fun",
    "Others",
  ]);
  const [totalFix, setTotalFix] = useState(0);
  const [totalVar, setTotalVar] = useState(0);
  const [dispacthFee, setDispatchFee] = useState(0.85);
  const [totalFee, setTotalFee] = useState();
  const { weeklyLoadsKeys } = useContext(LoadsContext);
  const [isMonthly, setIsMonthly] = useState(false);
  const [isAll, setIsAll] = useState(false);
  const [numberOfWeeks, setNumberOfWeeks] = useState(1);
  const [weeklySortedExpenses, setWeeklySortedExpenses] = useState({});
  const [isExpenses, setIsExpenses] = useState(true);
  useEffect(() => {
    setFixedExp(LOCAL_FIXED_EXPENSES);
    setWeeklySortedExpenses(LOCAL_WEEKLY_FILTERED_EXPENSES);
  }, []);

  useEffect(() => {
    const lastWeek = weeklySortedExpenses[weeklyLoadsKeys[0]];

    if (lastWeek) {
      const { data } = lastWeek;
      setIsExpenses(true);
      setVariableExp(data);
    } else {
      setIsExpenses(false);
    }
  }, [weeklySortedExpenses, weeklyLoadsKeys, weeklyLoadsKeys]);

  useEffect(() => {
    const total = getTotalAmount(variableExp);

    setTotalVar(total);
  }, [variableExp]);

  useEffect(() => {
    const total = getTotalAmount(fixedExp);

    setTotalFix(total * numberOfWeeks);
  }, [fixedExp, numberOfWeeks]);

  useEffect(() => {
    const numberOfWeeks = calculateFixedExp(variableExp, isMonthly, isAll);

    setNumberOfWeeks(numberOfWeeks);
  }, [variableExp, isAll, isMonthly]);

  //setting new Dispatch Fee
  const setNewDispatchFee = (percent) => {
    setDispatchFee((100 - +percent) / 100);
  };

  useEffect(() => {
    console.log("UseEffect in Total Fee expenses CTX");
    const output = (totalGross - dispacthFee * totalGross).toFixed(0);

    setTotalFee(+output);
  }, [totalGross, dispacthFee]);

  //add new category
  const addNewCategory = (newCategory) => {
    const isUnique = categories.every(
      (category) => newCategory.toLowerCase() !== category.toLowerCase()
    );

    const category = startCase(newCategory);

    if (isUnique) {
      setCategories((prevState) => [...prevState, category]);
    } else {
      alert("Category is already in the list of categories");
    }
  };

  const setExpensesInGivenDateRange = (beginDate, endDate) => {
    const filteredExpensesInRange = filterDataInGivenDateRange(
      LOCAL_VAR_EXPENSES,
      beginDate,
      endDate
    );

    if (filteredExpensesInRange) {
      setIsExpenses(true);
      setVariableExp(filteredExpensesInRange);
      setIsAll(true);
    }
  };

  //filter by chosen month and year;
  const setExpensesMonthly = (year, month) => {
    const monthlyExpenses = filterMonthly(LOCAL_VAR_EXPENSES, year, month);
    if (monthlyExpenses) {
      setVariableExp(monthlyExpenses);
      setIsExpenses(true);
      setIsMonthly(true);
      setIsAll(false);
      return true;
    } else {
      setIsExpenses(false);
    }
  };

  //sort weekly from Monday to Sunday
  const setExpensesWeekly = (dateKey) => {
    if (!weeklySortedExpenses[dateKey]) {
      setIsExpenses(false);

      setVariableExp([]);
      return;
    }

    setIsAll(false);
    setIsMonthly(false);
    const weeklyExpenses = weeklySortedExpenses[dateKey];

    const { data } = weeklyExpenses;

    setIsExpenses(true);
    setVariableExp(data);
  };

  const getAllExpenses = () => {
    const sortedExpenses = sortBy(LOCAL_VAR_EXPENSES, ["dateCreated"]);
    setVariableExp(sortedExpenses);

    setIsExpenses(true);
    setIsAll(true);
    setIsMonthly(false);
  };

  //create expense
  const addExpense = async (expense, dbName) => {
    // await addDoc(collection(db, dbName), expense);
    if (dbName === "variable-expenses") {
      setVariableExp((prevState) => [expense, ...prevState]);
      setIsExpenses(true);
    }

    if (dbName === "fixed-expenses") {
      setFixedExp((prevState) => [expense, ...prevState]);
    }
  };

  //delete expense
  const deleteExpense = async (id, dbName) => {
    //await deleteDoc(doc(db, dbName, id));
    if (dbName === "variable-expenses") {
      const arr = variableExp.filter((expense) => expense.id !== id);
      setVariableExp(arr);
    }

    if (dbName === "fixed-expenses") {
      const arr = fixedExp.filter((expense) => expense.id !== id);
      setFixedExp(arr);
    }
  };

  const contextValue = {
    fixedExp,
    variableExp,
    totalFix,
    totalVar,
    totalFee,
    categories,
    dispacthFee,
    getAllExpenses,
    isExpenses,
    weeklySortedExpenses,
    setNewDispatchFee,
    setExpensesInGivenDateRange,
    setExpensesMonthly,
    setExpensesWeekly,
    addExpense,
    addNewCategory,
    deleteExpense,
  };

  return (
    <ExpensesContext.Provider value={contextValue}>
      {props.children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContext;

const getTotalAmount = (array) => {
  const total = array.reduce((acc, el) => {
    acc += +el.amount;

    return acc;
  }, 0);

  return total;
};

const getCategories = (array) => {
  const categories = array.reduce((acc, el) => {
    const { category } = el;

    if (!acc.includes(category)) {
      acc.push(startCase(category));
    }
    return acc;
  }, []);

  return categories;
};

const randomVarExpensesGenerator = () => {
  let startDate = new Date(2022, 0, 1);
  let endDate = new Date(2023, 0, 30);
  const categories = [
    "Food",
    "Fuel",
    "Travel",
    "Maintenance",
    "Codriver",
    "Fun",
    "Others",
  ];

  const arrOfVarExpenses = [];
  for (let i = 0; i < 140; i++) {
    const date = DateGenerator.getRandomDateInRange(startDate, endDate);
    const amount = Math.floor(Math.random() * 1000 + 50);
    const rnd = Math.floor(Math.random() * categories.length);

    const expense = {
      dateCreated: date,
      id: uuidv4(),
      amount: amount,
      notes: "Random",
      category: categories[rnd],
    };

    arrOfVarExpenses.push(expense);
  }

  //console.log(arrOfVarExpenses);

  return arrOfVarExpenses;
};
