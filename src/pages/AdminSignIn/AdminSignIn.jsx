import { ReactComponent as UserIcon } from "../../assets/svgs/UserIcon.svg";
import { ReactComponent as PasswordIcon } from "../../assets/svgs/PasswordIcon.svg";
import { ReactComponent as WrenchIcon } from "../../assets/svgs/WrenchIcon.svg";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app, db } from "../../firebase.config";
import { useState, useContext } from "react";
import { Authentication } from "../../HOC";
import AdminContext from "../../context/AdminContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import styles from "./AdminSignIn.module.css";
import { toast } from "react-toastify";

const AdminSignIn = () => {
  const { setIsAdmin, setIsUser } = useContext(AdminContext);

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
        // navigate("/user-dashboard");
        //Check to see if user is admin
        const usersRef = collection(db, "users");
        const q = query(
          usersRef,
          where("email", "==", userCredential.user.email),
          where("isAdmin", "==", true)
        );

        const querySnap = await getDocs(q);

        if (querySnap.docs.length === 1) {
          console.log(querySnap);
          setIsAdmin(true);
          setIsUser(true);
          navigate("/admin-dashboard");
        } else {
          toast.error("You are not an administrator!");
        }
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
    <Authentication
      admin={true}
      headingText={
        <>
          SIGN{" "}
          <span>
            <WrenchIcon
              width="3.7rem"
              height="4rem"
              className={styles.wrench}
            />
          </span>
          {""}N
        </>
      }
    >
      <form className={styles.form} onSubmit={validateUser}>
        <div className={styles.wrap}>
          <div className={styles.wrapper}>
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
          </div>
          <div className={styles.wrapper}>
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
          </div>
          <div className={styles["auth-wrap"]}>
            <button className={styles.auth} type="submit">
              LOGIN
            </button>
            <div className={styles["auth-other"]}>
              <Link to="/forgot-password" className={styles.forgotPassword}>
                forgot password
              </Link>
              <Link to="/" className={styles.register}>
                &lt; Back to Home
              </Link>
            </div>
          </div>
        </div>
      </form>
    </Authentication>
  );
};

export default AdminSignIn;
