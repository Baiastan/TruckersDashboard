import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./ChangePassword.module.scss";
import { validatePassword } from "../../lib/validation-utils";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../store/auth-context";
const ChangePassword = () => {
  const newPasswordInputRef = useRef();
  const [errorMessage, setErrorMesage] = useState(null);
  const { isLoading, error, sendRequest } = useHttp();
  const [statusMessage, setStatusMessage] = useState(null);
  const authCtx = useContext(AuthContext);

  const handleNewPassword = (data) => {
    setErrorMesage(null);
    if (data.error && data.error.message) {
      setStatusMessage(
        "Failed to Update password, logout to update the password"
      );
      return;
    }

    setStatusMessage("Successfully Updated!");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    const passwordData = validatePassword(enteredNewPassword);

    console.log(passwordData);
    if (passwordData.isInvalid) {
      setErrorMesage(passwordData.message);
      return;
    }

    sendRequest(
      {
        url: "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBAJhsQBQYmT6SFeexYHGUBaYCBYsIsA2U",
        method: "POST",
        body: {
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
      handleNewPassword
    );
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordInputRef} />
      </div>
      <div className={classes.actions}>
        {!isLoading ? <button>Change Password</button> : <p>...loading</p>}
        {statusMessage && <p className="error">{statusMessage}</p>}
        {errorMessage && <p className="error">{errorMessage}</p>}

        <Link to="/account">Done</Link>
      </div>
    </form>
  );
};

export default ChangePassword;
