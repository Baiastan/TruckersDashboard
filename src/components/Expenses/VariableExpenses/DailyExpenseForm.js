import React, { useContext, useRef, useState } from "react";
import classes from "./DailyExpenseForm.module.scss";
import Proccessing from "../../UtilComponents/Proccessing";
import { FaPlus } from "react-icons/fa";
import {
  validateNumberInput,
  validateStringInput,
} from "../../../lib/validation-utils";
import ExpensesContext from "../../../store/expenses-context";
import { uniqueId } from "lodash";

const DailyExpenseForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [addNewCat, setAddNewCat] = useState(false);
  const [category, setCategory] = useState("Fuel");
  const ctxExpense = useContext(ExpensesContext);
  const categoryInputRef = useRef();
  const amountInputRef = useRef();
  const notesInputRef = useRef();

  const handleCategory = (e) => {
    const selected = e.target.value;

    if (selected === "add") {
      setAddNewCat(true);
    } else {
      setCategory(selected);
    }
  };

  const handleAddCategory = () => {
    const enteredCategory = categoryInputRef.current.value;

    if (!validateStringInput(enteredCategory)) {
      setAddNewCat(false);
      return;
    }

    ctxExpense.addNewCategory(enteredCategory);

    setCategory(enteredCategory);

    setAddNewCat(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    let enteredNotes = notesInputRef.current.value;

    if (!validateNumberInput(enteredAmount)) {
      alert("Amount cannot be empty!");
      amountInputRef.current.focus();
      return;
    }

    const newExpense = {
      dateCreated: new Date(),
      id: uniqueId(),
      amount: enteredAmount,
      notes: enteredNotes,
      category: category,
    };

    ctxExpense.addExpense(newExpense, "variable-expenses");

    amountInputRef.current.focus();
    amountInputRef.current.value = "";
    notesInputRef.current.value = "";
    setAddNewCat(false);
    setIsLoading(true);
  };

  return (
    <div className={classes["daily-expense-form"]}>
      <Proccessing isLoading={isLoading} setIsLoading={setIsLoading} />
      <form onSubmit={handleSubmit}>
        <div className={classes["form-control"]}>
          <div className={classes["sort-list"]}>
            <select onChange={handleCategory} defaultValue={category}>
              {ctxExpense.categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}

              <option value="add">Add New Category</option>
            </select>

            {addNewCat && (
              <>
                <input
                  type="text"
                  placeholder="type here"
                  className={classes.input_category}
                  ref={categoryInputRef}
                  autoFocus
                />
                <i onClick={handleAddCategory}>
                  {" "}
                  <FaPlus />
                </i>
              </>
            )}
          </div>
          <label htmlFor="expense">Amount</label>
          <input type="number" id="expense" ref={amountInputRef} autoFocus />
          <label htmlFor="note">Notes</label>
          <input type="text" id="note" ref={notesInputRef} />
        </div>
        <button className={classes.button}>Add Expense</button>
      </form>
    </div>
  );
};

export default DailyExpenseForm;
