import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase.config";
import { Authentication } from "../../HOC";
import { ReactComponent as UserIcon } from "../../assets/svgs/UserIcon.svg";
import { ReactComponent as PasswordIcon } from "../../assets/svgs/PasswordIcon.svg";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminContext from "../../context/AdminContext";
import styles from "./UserSignIn.module.css";
import { toast } from "react-toastify";

const UserSignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;

  const navigate = useNavigate();

  const { setIsUser } = useContext(AdminContext);

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
        setIsUser(true);
        navigate("/user-dashboard");
      }
    } catch (error) {
      if (error.message === "Firebase: Error (auth/network-request-failed).") {
        toast.error("Network Error!");
      } else {
        toast.error("Invalid email or password!");
      }
    }
  };
  return (
    <Authentication headingText="SIGN IN">
      <form className={styles.form} onSubmit={validateUser}>
        <label htmlFor="email">
          <UserIcon className={styles.icon} />
        </label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          className={styles.inputField}
          value={email}
          onChange={onChange}
        />
        <label htmlFor="password">
          <PasswordIcon className={styles.icon} />
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className={styles.inputField}
          value={password}
          onChange={onChange}
        />

        <button className={styles.auth} type="submit">
          LOGIN
        </button>
        <div className={styles["auth-other"]}>
          <Link to="/forgot-password" className={styles.forgotPassword}>
            forgot password
          </Link>
          <Link to="/register" className={styles.register}>
            register
          </Link>
        </div>
      </form>
    </Authentication>
  );
};

export default UserSignIn;
