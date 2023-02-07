import { useContext, useRef, useState } from "react";
import { IoLocationSharp, IoCalculatorSharp } from "react-icons/io5";

import { validateLoadInputs } from "../../lib/validation-utils";
import classes from "./AddLoadForm.module.scss";

import LoadsContext from "../../store/transactions-context";
import Proccessing from "../UtilComponents/Proccessing";
import { getPosition } from "../../lib/api-utils";
import { uniqueId } from "lodash";
import randomDateGenerator from "random-date-generator";
import DateGenerator from "random-date-generator/src/DateGenerator";

function AddExpenseForm() {
  const [isLoadAdding, setIsLoadAdding] = useState(false);

  const transactionsCtx = useContext(LoadsContext);
  const loadNoteInput = useRef();
  const loadAmountInput = useRef();
  const ratePerMileInput = useRef();
  const totalMilesInput = useRef();
  const fromInput = useRef();
  const toInput = useRef();
  const [rpm, setRpm] = useState(0);

  const handleCurrentLocation = async () => {
    setIsLoadAdding(true);
    const position = await getPosition();

    fromInput.current.value = `${position.state} ${position.city}`;
  };

  const calcRpm = () => {
    const data = validateLoadInputs(loadAmountInput, totalMilesInput);
    const calcedRate = (+data.enteredAmount / +data.enteredMiles).toFixed(2);

    setRpm(calcedRate);
  };

  function onSubmit(e) {
    e.preventDefault();

    const enteredLoadNote = loadNoteInput.current.value;
    const enteredFrom = fromInput.current.value;
    const enteredTo = toInput.current.value;

    const data = validateLoadInputs(
      loadAmountInput,
      totalMilesInput,
      ratePerMileInput
    );

    if (!data) {
      return;
    }

    const newLoad = {
      dateCreated: new Date(),
      id: uniqueId(),
      amount: data.enteredAmount,
      note: enteredLoadNote,
      miles: data.enteredMiles,
      rate: data.enteredRate,
      from: enteredFrom,
      destination: enteredTo,
    };

    transactionsCtx.addLoad(newLoad);
    //setIsLoadAdding(true);

    loadNoteInput.current.value = "";
    loadAmountInput.current.value = "";
    ratePerMileInput.current.value = "";
    totalMilesInput.current.value = "";
    fromInput.current.value = "";
    toInput.current.value = "";
    setRpm("");
    loadAmountInput.current.focus();
  }

  return (
    <section className={classes["load-form"]}>
      <Proccessing isLoading={isLoadAdding} setIsLoading={setIsLoadAdding} />
      <h3>Add New Load</h3>
      <form onSubmit={onSubmit}>
        <div className={classes["form-control"]}>
          <label htmlFor="text">Load Amount</label>
          <input
            type="number"
            ref={loadAmountInput}
            placeholder="0*"
            autoFocus
          />
        </div>
        <div className={classes.rate_miles__input}>
          <div className={classes["form-control"]}>
            <label htmlFor="note">Total Miles</label>
            <input
              type="number"
              id="note"
              ref={totalMilesInput}
              placeholder="miles*"
            />
          </div>
          <button type="button" className={classes.btn_calc} onClick={calcRpm}>
            <IoCalculatorSharp />
          </button>
          <div className={classes["form-control"]}>
            <label htmlFor="rate">Rate Per Mile</label>
            <input
              type="text"
              id="rate"
              ref={ratePerMileInput}
              onFocus={() => console.log("Focused")}
              value={rpm}
              onChange={(e) => setRpm(e.target.value)}
              placeholder="$"
            />
          </div>
        </div>

        <div className={classes["form-control"]}>
          <label htmlFor="from">From</label>
          <div className={classes["from-block"]}>
            <input
              className={classes.from_input}
              type="text"
              id="from"
              ref={fromInput}
              placeholder="from"
            />
            <span className={classes.location_icon}>
              <i
                type="button"
                className={classes.btn_location}
                onClick={handleCurrentLocation}
              >
                <IoLocationSharp />
              </i>
            </span>
          </div>
        </div>
        <div className={classes["form-control"]}>
          <label htmlFor="to">Destination</label>
          <input type="text" id="to" ref={toInput} placeholder="to" />
        </div>

        <div className={classes["form-control"]}>
          <label htmlFor="text">Note</label>
          <input type="text" ref={loadNoteInput} placeholder="Enter note..." />
        </div>

        <button className={classes.button}>Add Load</button>
      </form>
    </section>
  );
}
export default AddExpenseForm;

function TextInput({ ratePerMileInput, rpm, e, setRpm }) {
  return (
    <div className={classes["form-control"]}>
      <label htmlFor="rate">Rate Per Mile</label>
      <input
        type="text"
        id="rate"
        ref={ratePerMileInput}
        onFocus={() => console.log("Focused")}
        value={rpm}
        onChange={(e) => setRpm(e.target.value)}
        placeholder="$"
      />
    </div>
  );
}
