import React, { useContext, useEffect, useState } from "react";
import { LOCAL_LOADS } from "../../local-loads-data";
import LoadsContext from "../../store/transactions-context";
import LineChart from "./LineChart";

const Rates = () => {
  const { loads } = useContext(LoadsContext);
  const [rates, setRates] = useState([]);

  useEffect(() => {
    const allRates = loads.map((entry) => {
      return { value: entry.rate, name: `$${entry.rate}` };
    });

    setRates(allRates);
  }, [loads]);

  return <LineChart data={rates} />;
};

export default Rates;
