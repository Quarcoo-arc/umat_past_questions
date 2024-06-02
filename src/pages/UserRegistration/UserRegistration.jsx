import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Authentication } from "../../HOC";
import { app, db } from "../../firebase.config";
import styles from "./UserRegistration.module.css";

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
    <Authentication headingText="REGISTER" redIcon={true}>
      <form className={styles.form} onSubmit={addUser}>
        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="First Name"
          className={styles.inputField}
          onChange={onChange}
          value={firstName}
        />
        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Last Name"
          className={styles.inputField}
          onChange={onChange}
          value={lastName}
        />
        <input
          type="number"
          name="id"
          id="id"
          placeholder="ID/Ref. No."
          className={styles.inputField}
          onChange={onChange}
          value={id}
        />
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          className={styles.inputField}
          onChange={onChange}
          value={username}
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className={`${styles.inputField} ${styles.xlg}`}
          onChange={onChange}
          value={email}
        />

        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className={`${styles.inputField} ${styles.lg}`}
          onChange={onChange}
          value={password}
        />
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm Password"
          className={`${styles.inputField} ${styles.lg} ${styles.last}`}
          onChange={onChange}
          value={confirmPassword}
        />

        <div className={styles["auth-wrap"]}>
          <button className={styles.auth} type="submit">
            REGISTER
          </button>
          <div className={styles["auth-other"]}>
            <p className={styles.forgotPassword}>
              Already have an account? &nbsp;&nbsp;
              <Link to="/sign-in" className={styles.register}>
                login
              </Link>
            </p>
          </div>
        </div>
      </form>
    </Authentication>
  );
};

export default UserRegistration;
