export const validatePassword = (password) => {
  let message =
    "Password should contain at least one lowercase letter, 8 character long, and at least one Uppercase letter, and one specail character";
  //8 character long, at least one lowercase letter, at least one uppercase letter, at least one number
  const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const re1 = /^(?=.*\d).{6,}$/;

  if (!re1.test(password)) {
    return {
      isInvalid: true,
      message: message,
    };
  }

  return { isInvalid: false };
};

export const validateNumberInput = (number) => {
  if (number < 0 || number === "0" || !number) {
    return false;
  }
  return true;
};

export const validateFloatNumberInput = (number) => {
  if (number.includes(",")) {
    number = number.replace(",", ".");
  }

  if (typeof +number === "number" && !isNaN(+number)) {
    return number;
  }

  return null;
};

export const validateStringInput = (str) => {
  if (str.trim().length === 0) {
    return false;
  }

  return true;
};

export const isInputsChanged = (updatedData, oldData) => {
  for (const key in updatedData) {
    if (updatedData[key] !== oldData[key]) {
      return true;
    }
  }

  return false;
};

export const validateLoadInputs = (amountInput, milesInput, rateInput) => {
  const amount = amountInput.current.value;
  const miles = milesInput.current.value;

  let rate;

  if (rateInput) {
    rate = validateFloatNumberInput(rateInput.current.value);
  }

  const isAmountValid = validateNumberInput(amount);
  const isEnterdMilesValid = validateNumberInput(miles);

  //const isNoteValid = validateStringInput(enteredLoadNote);

  if (!isAmountValid) {
    alert("Load Amount Input cannot be empty or negative");
    amountInput.current.focus();
    return;
  }
  if (!isEnterdMilesValid) {
    alert("Miles cannot be empty or negative!");
    milesInput.current.focus();
    return;
  }

  if (rateInput) {
    if (!rate) {
      alert("Please enter a valid input");
      rateInput.current.focus();
      return;
    }
  }

  return {
    enteredAmount: amount,
    enteredMiles: miles,
    enteredRate: rate ? rate : null,
  };
};
