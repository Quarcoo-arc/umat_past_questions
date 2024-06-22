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
import { useAuthStatus } from "../../hooks/useAuthStatus";

const Footer = () => {
  const { setIsAdmin, setIsUser } = useContext(AdminContext);
  const { loggedIn: isLoggedIn, setLoggedIn } = useAuthStatus();

  const auth = getAuth();
  const navigate = useNavigate();

  const logout = () => {
    auth.signOut();
    setIsAdmin(false);
    setIsUser(false);
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <div className={styles.background}>
      <div className={styles.row}>
        <div className={styles.column}>
          <AvatarIcon width="3rem" />
          {isLoggedIn ? (
            <span onClick={logout} className={styles.logout}>
              Logout
            </span>
          ) : (
            <div className={styles.flex}>
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
        <UmatLogo className={styles.umatLogo} />
        <div className={styles.socialsWrapper}>
          <FacebookLogo width="1.8rem" className={styles.icon} />
          <img src={InstagramLogo} className={styles.smallIcon} alt="" />
          <TwitterLogo width="1.8rem" className={styles.icon} />
        </div>
      </div>
      <div className={styles.center}>
        <p>University of Mines and Technology</p>
        <div className={styles.line}>
          <Line width={"100%"} />
        </div>
        <div className={styles.space}>
          <p>Copyright &copy; {new Date().getFullYear()}</p>
          <p>|</p>
          <a
            href="https://github.com/Quarcoo-arc"
            target="_blank"
            className={styles.link}
            rel="noreferrer"
          >
            Michael Quarcoo
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
