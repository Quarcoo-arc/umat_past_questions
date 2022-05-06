import logo from "../assets/images/umat-logo.png";
import { ReactComponent as CorrectIcon } from "../assets/svgs/CorrectSign.svg";
import { ReactComponent as UserIcon } from "../assets/svgs/UserIcon.svg";
import { ReactComponent as PasswordIcon } from "../assets/svgs/PasswordIcon.svg";

const UserRegistration = () => {
  return (
    <div className="background">
      <div className="card">
        <div className="container">
          <h1 className="heading">REGISTER</h1>
          <CorrectIcon width="10rem" className="checkMark" />
        </div>
        <form className="form">
          <div className="wrapper">
            <label htmlFor="username">
              <UserIcon className="icon" />
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              className="inputField"
            />
          </div>
          <div className="wrapper">
            <label htmlFor="password">
              <PasswordIcon className="icon" />
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="inputField"
            />
          </div>

          <button className="auth" type="submit">
            REGISTER
          </button>
        </form>
        <div className="auth-other">
          <p className="forgotPassword">
            Already have an account?{"  "}
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

export default UserRegistration;
