import logo from "../assets/images/umat-logo.png";
import { ReactComponent as CorrectIcon } from "../assets/svgs/CorrectSign.svg";
import { ReactComponent as UserIcon } from "../assets/svgs/UserIcon.svg";

const UserSignIn = () => {
  return (
    <div className="background">
      <div className="card">
        <div className="container">
          <h1 className="heading">SIGN IN</h1>
          <CorrectIcon width="10rem" className="checkMark" />
        </div>
        <form>
          <label htmlFor="username">
            <UserIcon />
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
          />
          <label htmlFor="username">
            <UserIcon />
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Password"
          />

          <button type="submit">LOGIN</button>
        </form>
        <a href="#" target="_blank" rel="noreferrer">
          forgot password
        </a>
        <a href="#" target="_blank" rel="noreferrer">
          register
        </a>
      </div>
      <img src={logo} alt="" className="logo" />
    </div>
  );
};

export default UserSignIn;
