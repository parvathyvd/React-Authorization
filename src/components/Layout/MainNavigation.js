import { Link } from "react-router-dom";
import { useGlobalContext } from "../../store/auth-context";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const { isLoggedIn, logout } = useGlobalContext();

  const logoutHandler = () => {
    logout();
    //optional redirect user
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>

              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
