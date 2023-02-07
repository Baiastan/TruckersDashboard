import { NavLink } from "react-router-dom";
import classes from "./Header.module.scss";

const Header = () => {
  const logoutHandler = () => {};
  return (
    <header className={classes.header}>
      <div className={classes.navigation}>
        <ul>
          <li>
            <NavLink activeClassName={classes.activeLink} to="/account">
              Profile
            </NavLink>
          </li>

          <li>
            <NavLink activeClassName={classes.activeLink} to="/dashboard">
              Dashboard
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
