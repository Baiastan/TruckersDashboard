import { sortBy, orderBy, gte, lte } from "lodash";

export const sortLoadsBy = (loads, by) => {
  let sortedArray = [];

  if (by === "ascRate") {
    sortedArray = sortBy(loads, (o) => +o.rate);
  }

  if (by === "ascDate") {
    sortedArray = sortBy(loads, ["dateCreated"]);
  }

  if (by === "descDate") {
    sortedArray = orderBy(loads, ["dateCreated"], ["desc"]);
    console.log(loads);
  }

  if (by === "descRate") {
    sortedArray = orderBy(loads, (o) => +o.rate, ["desc"]);
  }

  if (by === "ascAmount") {
    sortedArray = sortBy(loads, (o) => +o.amount);
  }

  if (by === "descAmount") {
    sortedArray = orderBy(loads, (o) => +o.amount, ["desc"]);
  }

  return sortedArray;
};

export const sortKeyDateAsc = (dates) => {
  const arrOfDates = [];

  for (const item of dates) {
    arrOfDates.push({
      date: new Date(item),
      key: item,
    });
  }

  const sortedArr = orderBy(arrOfDates, ["date"], ["desc"]);

  const newSortedDates = sortedArr.map((entry) => entry.key);

  return newSortedDates;
};

export const filterMonthly = (data, year, month) => {
  const arr = data.filter((entry) => {
    const date = new Date(entry.dateCreated);
    const monthData = date.getMonth(); //number
    const yearData = date.getFullYear(); //number

    if (monthData === month && yearData === year) {
      return entry;
    }
  });

  const monthlyLoads = orderBy(arr, ["dateCreated"]);

  return monthlyLoads.length > 0 ? monthlyLoads : null;
};

export const filterDataInGivenDateRange = (data, beginDate, endDate) => {
  const arr = data.filter((entry) => {
    if (gte(entry.dateCreated, beginDate) && lte(entry.dateCreated, endDate)) {
      return entry;
    }
  });

  if (arr.length <= 0) {
    return null;
  }

  const sortedArr = orderBy(arr, ["dateCreated"]);

  return sortedArr;
};

const filterByYear = (data, year) => {
  const result = data.filter((entry) => {
    const date = new Date(entry.dateCreated);
    const yearData = date.getFullYear();

    if (yearData === year) {
      return entry;
    }
  });
  return { data: result, year };
};

//working function -> need to implement
export function filterDataByWeek(data) {
  const result = {};
  //86400000 one day in milliseconds
  for (const item of data) {
    const date = new Date(item.dateCreated);
    const dayOfWeek = date.getDay();

    const mondayOfWeek = new Date(date.getTime() - (dayOfWeek - 1) * 86400000);

    const key = mondayOfWeek.toLocaleDateString("en-US");

    if (!result[key]) {
      result[key] = {
        data: [],
      };
    }

    result[key].data.push(item);
  }

  return result;
}

export const calculateFixedExp = (data, monthly, all) => {
  let numberOfWeeks = 1;

  if (monthly) {
    numberOfWeeks = 4;
  } else if (all) {
    const firstDate = data[0].dateCreated;
    const lastDate = data[data.length - 1].dateCreated;

    const firstLoad = new Date(firstDate);
    const lastLoad = new Date(lastDate);
    const s1 = firstLoad.getTime() / 1000;
    const s2 = lastLoad.getTime() / 1000;

    numberOfWeeks = ((s2 - s1) / 604800).toFixed(0);
  }

  return numberOfWeeks;
};
