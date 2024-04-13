import books from "../../assets/images/Books.png";
import { Footer, Header } from "../../components/index";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AdminContext from "../../context/AdminContext";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const { isAdmin, isUser } = useContext(AdminContext);

  const onClick = () => navigate("/user-dashboard");

  return (
    <div>
      <div className="background-red">
        <Header isLoggedIn={isUser} isAdmin={isAdmin} />
        <div className={styles.content}>
          <img src={books} alt="" className={styles.books} />
          <div className={styles.col}>
            <p>Get access to Past Questions in all courses!</p>
            <button className={styles.auth} onClick={onClick}>
              GET STARTED
            </button>
          </div>
        </div>
      </div>
      <Footer isLoggedIn={isUser} />
    </div>
  );
};

export default LandingPage;
