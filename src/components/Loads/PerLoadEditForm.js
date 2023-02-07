import React, { useContext, useRef } from "react";
import { FaCheck } from "react-icons/fa";
import classes from "./PerLoadEditForm.module.scss";
import LoadsContext from "../../store/transactions-context";
import {
  isInputsChanged,
  validateLoadInputs,
} from "../../lib/validation-utils";
import DateCreated from "../UtilComponents/DateCreated";

const PerLoadEditForm = (props) => {
  const { updateLoad } = useContext(LoadsContext);
  const loadNoteInput = useRef();
  const loadAmountInput = useRef();
  const ratePerMileInput = useRef();
  const totalMilesInput = useRef();
  const fromInput = useRef();
  const toInput = useRef();

  const handleDone = () => {
    const data = validateLoadInputs(
      loadAmountInput,
      totalMilesInput,
      ratePerMileInput
    );

    if (!data) {
      return;
    }

    const from = fromInput.current.value;
    const destination = toInput.current.value;
    const note = loadNoteInput.current.value;
    const {
      enteredAmount: amount,
      enteredMiles: miles,
      enteredRate: rate,
    } = data;

    const updatedData = {
      dateCreated: props.date,
      id: props.id,
      from,
      destination,
      note,
      amount,
      miles,
      rate,
    };

    const isChanged = isInputsChanged(updatedData, {
      dateCreated: props.date,
      id: props.id,
      from: props.from,
      destination: props.destination,
      note: props.note,
      amount: props.amount,
      miles: props.miles,
      rate: props.rate,
    });

    if (isChanged) {
      updateLoad(props.id, updatedData);
    }

    props.setEditing((prevState) => !prevState);

    //need a function to validate inputs of edited and load form!
  };

  return (
    <tr className={classes["edit-view"]}>
      <td className={classes.td_from}>
        <input type="text" ref={fromInput} defaultValue={props.from} />
      </td>
      <td className={classes.td_to}>
        <input type="text" ref={toInput} defaultValue={props.destination} />
      </td>
      <td className={classes.td_note}>
        <input type="text" ref={loadNoteInput} defaultValue={props.note} />
      </td>
      <td className={classes.td_date}>
        <DateCreated date={props.date} />
      </td>
      <td className={classes.td_miles}>
        {" "}
        <input type="number" ref={totalMilesInput} defaultValue={props.miles} />
      </td>
      <td className={classes.td_rate}>
        <input type="text" ref={ratePerMileInput} defaultValue={props.rate} />
      </td>
      <td className={classes.td_amount}>
        <input
          type="number"
          ref={loadAmountInput}
          defaultValue={props.amount}
        />
      </td>

      {props.children}
      <td onClick={handleDone} className={classes.td_done}>
        <i>
          <FaCheck />
        </i>
      </td>
    </tr>
  );
};

export default PerLoadEditForm;
