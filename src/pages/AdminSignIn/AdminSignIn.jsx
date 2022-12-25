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
import "./AdminSignIn.css";

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
          alert("You are not an administrator!");
        }
      }
    } catch (error) {
      if (error.message === "Firebase: Error (auth/invalid-email).") {
        alert("Invalid email!");
      } else if (error.message === "Firebase: Error (auth/user-not-found).") {
        alert("User not found!");
      } else if (error.message === "Firebase: Error (auth/wrong-password).") {
        alert("Incorrect password");
      } else if (
        error.message === "Firebase: Error (auth/network-request-failed)."
      ) {
        alert("Network Error!");
      } else {
        alert("Something went wrong!");
      }
      console.log(error);
    }
  };

  return (
    <Authentication
      admin={true}
      headingText={
        <>
          SIGN{" "}
          <span>
            <WrenchIcon width="3.7rem" height="4rem" className="wrench" />
          </span>
          {""}N
        </>
      }
    >
      <form className="form" onSubmit={validateUser}>
        <div className="wrap">
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
          <div className="auth-wrap">
            <button className="auth" type="submit">
              LOGIN
            </button>
            <div className="auth-other">
              <Link to="/forgot-password" className="forgotPassword">
                forgot password
              </Link>
              <Link to="/" className="register">
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
