import React from "react";
import { Link, useParams } from "react-router-dom";
import { Authentication } from "../../HOC";
import styles from "./PasswordReset.module.css";

const PasswordReset = () => {
  const { email } = useParams();
  //TODO: check if email exists in database
  return (
    <Authentication
      longHeading={true}
      headingText="PASSWORD RESET"
      redIcon={true}
    >
      <form className={styles.form}>
        <div className={styles.wrapper}>
          <p>
            Password reset for <span className={styles.green}>{email}</span>
          </p>
        </div>
        <div className={styles.wrapper}>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className={styles.inputField}
          />
        </div>
        <div className={`${styles.wrapper} ${styles["small-space"]}`}>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            placeholder="Confirm Password"
            className={styles.inputField}
          />
        </div>

        <button className={styles.auth} type="submit">
          RESET
        </button>
      </form>
      <div className={styles["auth-other"]}>
        <p className={styles.forgotPassword}>
          Return to &nbsp;
          <Link to="/sign-in" className={styles.register}>
            login
          </Link>
        </p>
      </div>
    </Authentication>
  );
};

export default PasswordReset;
