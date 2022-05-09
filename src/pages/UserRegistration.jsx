import logo from "../assets/images/umat-logo.png";
import { ReactComponent as CorrectIcon } from "../assets/svgs/CorrectSign.svg";

const UserRegistration = () => {
  return (
    <div className="background">
      <div className="card">
        <div className="container">
          <h1 className="heading">REGISTER</h1>
          <CorrectIcon width="10rem" className="checkMark red" />
        </div>
        <form className="form new">
          <div className="col">
            <div className="wrapper">
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                className="inputField new"
              />
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                className="inputField new"
              />
              <input
                type="number"
                name="id"
                id="id"
                placeholder="ID/Ref. No."
                className="inputField new"
              />
            </div>
            <div className="wrapper">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                className="inputField new"
              />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="inputField new xlg"
              />
            </div>
            <div className="wrapper space">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="inputField new lg"
              />
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                className="inputField new lg"
              />
            </div>
          </div>

          <button className="auth new" type="submit">
            REGISTER
          </button>
        </form>
        <div className="auth-other new">
          <p className="forgotPassword">
            Already have an account? &nbsp;&nbsp;
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
