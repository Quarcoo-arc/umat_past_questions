import { Link } from "react-router-dom";
import logo from "../assets/images/umat-logo.png";
import { ReactComponent as CorrectIcon } from "../assets/svgs/CorrectSign.svg";
import { ReactComponent as EmailIcon } from "../assets/svgs/EmailIcon.svg";

const AccountRecovery = () => {
  return (
    <div className="background">
      <div className="card">
        <div className="container">
          <h1 className="heading small">ACCOUNT RECOVERY</h1>
          <CorrectIcon width="10rem" className="checkMark" />
        </div>
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
      </div>
      <img src={logo} alt="" className="logo" />
    </div>
  );
};

export default AccountRecovery;
