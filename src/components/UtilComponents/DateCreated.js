import React from "react";

const DateCreated = ({ date }) => {
  const output = new Date(date);

  const month = output.toLocaleString("en-US", { month: "short" });
  const day = output.toLocaleString("en-US", { day: "2-digit" });
  const year = output.getFullYear();

  return <div>{`${day} ${month} ${year}`}</div>;
};

export default DateCreated;
