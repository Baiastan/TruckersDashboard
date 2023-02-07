import { useContext, useRef, useState } from "react";
import { validateNumberInput } from "../../lib/validation-utils";
import classes from "./PercentForm.module.scss";
import ExpensesContext from "../../store/expenses-context";

const PercentForm = () => {
  const percentInputRef = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const { setNewDispatchFee, dispacthFee } = useContext(ExpensesContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const percent = percentInputRef.current.value;

    const isValid = validateNumberInput(percent);

    if (!isValid && percent !== "0") {
      setIsEditing(false);
      return;
    }

    setNewDispatchFee(percent);

    setIsEditing(false);

    percentInputRef.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit} className={classes.percent_form_container}>
      <label htmlFor="percent">Company Fee:</label>
      {isEditing ? (
        <input
          type="number"
          id="percent"
          ref={percentInputRef}
          placeholder="%"
        />
      ) : (
        <div className={classes.text} onDoubleClick={() => setIsEditing(true)}>
          {100 - dispacthFee * 100}%
        </div>
      )}
    </form>
  );
};

export default PercentForm;
