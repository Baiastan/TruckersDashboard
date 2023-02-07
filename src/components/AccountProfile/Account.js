import React from "react";
import { Link } from "react-router-dom";
import classes from "./Account.module.scss";
const Account = () => {
  return (
    <section className={classes.account}>
      <h1>My Profile</h1>
      <div>
        <Link to="/account/change-password">Change Password</Link>
      </div>
    </section>
  );
};

export default Account;
