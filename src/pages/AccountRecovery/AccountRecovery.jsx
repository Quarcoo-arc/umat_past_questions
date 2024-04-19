import { Link } from "react-router-dom";
import { ReactComponent as EmailIcon } from "../../assets/svgs/EmailIcon.svg";
import { Authentication } from "../../HOC";
import styles from "./AccountRecovery.module.css";

const AccountRecovery = () => {
  return (
    <Authentication headingText="ACCOUNT RECOVERY" longHeading={true}>
      <form className={styles.form}>
        <div className={styles.wrapper}>
          <label htmlFor="email">
            <EmailIcon className={styles.icon} />
          </label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter your email address"
            className={styles.inputField}
          />
        </div>
        <button className={styles.auth} type="submit">
          SEND
        </button>
      </form>
      <div className={styles.authWrapper}>
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

export default AccountRecovery;
