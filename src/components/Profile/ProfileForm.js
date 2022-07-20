import { useRef } from "react";
import { useGlobalContext } from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const newPasswordRef = useRef();
  const { token } = useGlobalContext();
  console.log("toekn", token);

  const submitHandler = (e) => {
    e.preventDefault();
    const newPassword = newPasswordRef.current.value;
    //reset pwd

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAg8RjK7mEGLavppGyyIOFBNLvPSLp1AqM",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          password: newPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      //assumption always success
      console.log(res);
      // redirect the user if want
    });
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          ref={newPasswordRef}
          minLength="7"
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
