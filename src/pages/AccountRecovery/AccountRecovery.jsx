import { Link } from "react-router-dom";
import { ReactComponent as EmailIcon } from "../../assets/svgs/EmailIcon.svg";
import { Authentication } from "../../HOC";

const AccountRecovery = () => {
  return (
    <Authentication headingText="ACCOUNT RECOVERY" longHeading={true}>
      <form className="form new">
        <div className="wrapper row-center">
          <label htmlFor="email">
            <EmailIcon className="icon" />
          </label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter your email address"
            className="inputField new xxlg"
          />
        </div>
        <button className="auth new" type="submit">
          SEND
        </button>
      </form>
      <div className="auth-other new end">
        <p className="forgotPassword">
          Return to &nbsp;
          <Link to="/sign-in" className="register">
            login
          </Link>
        </p>
      </div>
    </Authentication>
  );
};

export default AccountRecovery;
