import logo from "../assets/images/umat-logo.png";
import { ReactComponent as CorrectIcon } from "../assets/svgs/CorrectSign.svg";
import { useParams } from "react-router-dom";

const PasswordReset = () => {
  const params = useParams();
  //TODO: check if email exists in database
  return (
    <div className="background">
      <div className="card">
        <div className="container">
          <h1 className="heading small">PASSWORD RESET</h1>
          <CorrectIcon width="10rem" className="checkMark red" />
        </div>
        <form className="form new">
          <div className="wrapper row-center no-space">
            <div>
              &nbsp;&nbsp;&nbsp;Password reset for{" "}
              <span className="green">{params.email}</span>{" "}
            </div>
          </div>
          <div className="wrapper row-center no-space">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="inputField new xxlg full"
            />
          </div>
          <div className="wrapper row-center small-space">
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              placeholder="Confirm Password"
              className="inputField new xxlg full"
            />
          </div>
          <button className="auth new" type="submit">
            RESET
          </button>
        </form>
        <div className="auth-other new end">
          <p className="forgotPassword">
            Return to &nbsp;
            <a href="./" className="register">
              login
            </a>
          </p>
        </div>
      </div>
      <img src={logo} alt="" className="logo" />
    </div>
  );
};

export default PasswordReset;
