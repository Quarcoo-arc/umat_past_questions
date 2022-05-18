import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/umat-logo.png";
import { ReactComponent as CorrectIcon } from "../assets/svgs/CorrectSign.svg";
import { app, db } from "../firebase.config";

const UserRegistration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    id: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const {
    firstName,
    lastName,
    id,
    username,
    email,
    password,
    confirmPassword,
  } = formData;

  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  const addUser = async (event) => {
    event.preventDefault();

    if (
      !(
        firstName &&
        lastName &&
        id &&
        username &&
        email &&
        password &&
        confirmPassword
      )
    ) {
      alert("Please fill in the blanks");
      return;
    } else if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    } else if (password.length < 6) {
      alert("Password should be more than 6 characters!");
      return;
    }
    try {
      const auth = getAuth(app);

      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredentials.user;

      updateProfile(auth.currentUser, {
        displayName: username,
      });

      const formDataCopy = { ...formData };

      delete formDataCopy.password;
      delete formDataCopy.confirmPassword;

      formDataCopy.timeStamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/user-dashboard");
    } catch (error) {
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        alert("Email already in use!");
      } else {
        alert("Something went wrong!");
      }
      console.log(error.message);
    }
  };
  return (
    <div className="background">
      <div className="card">
        <div className="container">
          <h1 className="heading">REGISTER</h1>
          <CorrectIcon width="10rem" className="checkMark red" />
        </div>
        <form className="form new" onSubmit={addUser}>
          <div className="col">
            <div className="wrapper">
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                className="inputField new"
                onChange={onChange}
                value={firstName}
              />
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                className="inputField new"
                onChange={onChange}
                value={lastName}
              />
              <input
                type="number"
                name="id"
                id="id"
                placeholder="ID/Ref. No."
                className="inputField new"
                onChange={onChange}
                value={id}
              />
            </div>
            <div className="wrapper">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                className="inputField new"
                onChange={onChange}
                value={username}
              />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="inputField new xlg"
                onChange={onChange}
                value={email}
              />
            </div>
            <div className="wrapper space">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="inputField new lg"
                onChange={onChange}
                value={password}
              />
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                className="inputField new lg"
                onChange={onChange}
                value={confirmPassword}
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

export default UserRegistration;
