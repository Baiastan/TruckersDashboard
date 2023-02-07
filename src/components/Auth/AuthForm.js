import React, { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import classes from "./AuthForm.module.scss";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../store/auth-context";
import { validatePassword } from "../../lib/validation-utils";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMesage] = useState(null);
  const authCtx = useContext(AuthContext);
  const { isLoading, error, sendRequest: sendAuthRequest } = useHttp();
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const handleAccount = (data) => {
    console.log(data);

    if (data && data.error && data.error.message) {
      setErrorMesage(data.error.message);
      return;
    }
    const expirationTime = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );

    authCtx.login(data.idToken, expirationTime.toISOString());

    history.replace("/expense-tracker");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    if (!isLogin) {
      if (!enteredEmail.includes("@")) {
        setErrorMesage("email should contain @");
        return;
      }

      const passwordData = validatePassword(enteredPassword);
      if (passwordData.isInvalid) {
        setErrorMesage(passwordData.message);
        return;
      }
    }

    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBAJhsQBQYmT6SFeexYHGUBaYCBYsIsA2U";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBAJhsQBQYmT6SFeexYHGUBaYCBYsIsA2U";
    }

    sendAuthRequest(
      {
        url: url,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        },
      },
      handleAccount
    );

    // emailInputRef.current.value = "";
    // passwordInputRef.current.value = "";
  };

  const handleToggle = () => {
    setIsLogin((prevState) => !prevState);
    setErrorMesage(false);
  };

  let errorEmail;
  let errorPassword;

  if (errorMessage) {
    console.log("Need to work on UI");
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="gmail"
            id="email"
            className={classes[errorEmail]}
            ref={emailInputRef}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            className={classes[errorPassword]}
            type="password"
            id="password"
            ref={passwordInputRef}
            required
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          {isLoading && <p>Sending request...</p>}

          {errorMessage && <p className={classes.error}>{errorMessage}</p>}
          <button
            onClick={handleToggle}
            type="button"
            className={classes.toggle}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
