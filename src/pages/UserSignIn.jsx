import logo from "../assets/images/umat-logo.png";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase.config";
import { ReactComponent as CorrectIcon } from "../assets/svgs/CorrectSign.svg";
import { ReactComponent as UserIcon } from "../assets/svgs/UserIcon.svg";
import { ReactComponent as PasswordIcon } from "../assets/svgs/PasswordIcon.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserSignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;

  const navigate = useNavigate();

  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  const validateUser = async (event) => {
    event.preventDefault();

    try {
      const auth = getAuth(app);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate("/user-dashboard");
      }
    } catch (error) {
      if (error.message === "Firebase: Error (auth/invalid-email).") {
        alert("Invalid email!");
      } else if (error.message === "Firebase: Error (auth/user-not-found).") {
        alert("User not found!");
      } else if (error.message === "Firebase: Error (auth/wrong-password).") {
        alert("Incorrect password");
      } else {
        alert("Something went wrong!");
      }
      console.log(error);
    }
  };
  return (
    <div className="background">
      <div className="card">
        <div className="container">
          <h1 className="heading">SIGN IN</h1>
          <CorrectIcon width="10rem" className="checkMark" />
        </div>
        <form className="form" onSubmit={validateUser}>
          <div className="wrapper">
            <label htmlFor="email">
              <UserIcon className="icon" />
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              className="inputField"
              value={email}
              onChange={onChange}
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
              value={password}
              onChange={onChange}
            />
          </div>

          <button className="auth" type="submit">
            LOGIN
          </button>
        </form>
        <div className="auth-other">
          <a href="./forgot-password" className="forgotPassword">
            forgot password
          </a>
          <a href="./register" className="register">
            register
          </a>
        </div>
      </div>
      <img src={logo} alt="" className="logo" />
    </div>
  );
};

export default UserSignIn;
