import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as AvatarIcon } from "../../assets/svgs/AvatarIcon.svg";
import { ReactComponent as UmatLogo } from "../../assets/svgs/UmatLogo.svg";
import { ReactComponent as FacebookLogo } from "../../assets/svgs/FacebookLogo.svg";
import { ReactComponent as TwitterLogo } from "../../assets/svgs/TwitterLogo.svg";
import InstagramLogo from "../../assets/images/InstagramLogo.png";
import { ReactComponent as Line } from "../../assets/svgs/Line.svg";
import { getAuth } from "firebase/auth";
import AdminContext from "../../context/AdminContext";
import { useContext } from "react";
import styles from "./Footer.module.css";

const Footer = ({ isLoggedIn }) => {
  const { setIsAdmin, setIsUser } = useContext(AdminContext);
  const auth = getAuth();
  const navigate = useNavigate();

  const logout = () => {
    auth.signOut();
    setIsAdmin(false);
    setIsUser(false);
    navigate("/");
  };

  return (
    <div className={styles.background}>
      <div className={styles.row}>
        <div className={styles.column}>
          <AvatarIcon width="3rem" className={styles.avatar} />
          {isLoggedIn ? (
            <span onClick={logout} className={styles.logout}>
              Logout
            </span>
          ) : (
            <div className={styles.row}>
              <Link to="/register" className={styles.green}>
                Register
              </Link>
              &nbsp;|&nbsp;
              <Link to="/sign-in" className={styles.red}>
                Login
              </Link>
            </div>
          )}
        </div>
        <UmatLogo width="6rem" className={styles.icon} />
        <div className={styles.socialsWrapper}>
          <FacebookLogo width="1.8rem" className={styles.icon} />
          <img src={InstagramLogo} className={styles.smallIcon} alt="" />
          <TwitterLogo width="1.8rem" className={styles.icon} />
        </div>
      </div>
      <div className={styles.center}>
        <p>Knowledge | Truth | Excellence</p>
        <div className={styles.row}>
          <Line width={"100%"} />
        </div>
        <p>
          Copyright &copy; {new Date().getFullYear()} | University of Mines and
          Technology
        </p>
      </div>
    </div>
  );
};

export default Footer;
