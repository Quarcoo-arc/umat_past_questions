import React from "react";
import { Link, useParams } from "react-router-dom";
import { Authentication } from "../../HOC";

const PasswordReset = () => {
  const { email } = useParams();
  //TODO: check if email exists in database
  return (
    <Authentication
      longHeading={true}
      headingText="PASSWORD RESET"
      redIcon={true}
    >
      <form className="form new">
        <div className="wrapper row-center no-space">
          <div>
            &nbsp;&nbsp;&nbsp;Password reset for{" "}
            <span className="green">{email}</span>{" "}
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
          <Link to="/sign-in" className="register">
            login
          </Link>
        </p>
      </div>
    </Authentication>
  );
};

export default PasswordReset;
