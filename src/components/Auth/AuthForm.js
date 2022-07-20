import { useState, useRef } from "react";
import { useGlobalContext } from "../../store/auth-context";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useGlobalContext();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const authenticateUser = async (url) => {
      try {
        setIsLoading(true);
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        setIsLoading(false);

        if (!response.ok) {
          let errorMessage = "authentication failed";
          throw new Error(errorMessage);
        }
        const result = await response.json();

        console.log("result is", result);
        authCtx.login(result.idToken);
        //redirect user
      } catch (err) {
        console.log(err);
        alert(err);
      }
    };

    if (isLogin) {
      authenticateUser(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAg8RjK7mEGLavppGyyIOFBNLvPSLp1AqM"
      );
    } else {
      authenticateUser(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAg8RjK7mEGLavppGyyIOFBNLvPSLp1AqM"
      );
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p className={classes.loading}>Loading...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
