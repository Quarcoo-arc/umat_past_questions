import { ReactComponent as UmatLogo } from "../../assets/svgs/UmatLogo.svg";
import { ReactComponent as SpeedDialIcon } from "../../assets/svgs/SpeedDialIcon.svg";
import { ReactComponent as ToolsIcon } from "../../assets/svgs/ToolsIcon.svg";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useContext } from "react";
import AdminContext from "../../context/AdminContext";
import { useAuthStatus } from "../../hooks/useAuthStatus";

const Header = () => {
  const { isAdmin } = useContext(AdminContext);
  const { loggedIn: isLoggedIn } = useAuthStatus();

  return (
    <div className={styles.row}>
      <UmatLogo className={styles.icon} />
      <h1 className={styles.title}>Past Questions Database</h1>
      {!isLoggedIn && (
        <Link to="/sign-in" className={styles.action}>
          Login
        </Link>
      )}
      {isLoggedIn && isAdmin && (
        <Link to="/admin-dashboard" className={styles.center}>
          <ToolsIcon className={`${styles.icon} ${styles.sm}`} />
        </Link>
      )}
      {isLoggedIn && !isAdmin && (
        <Link to="/user-dashboard" className={styles.center}>
          <SpeedDialIcon className={`${styles.icon} ${styles.sm}`} />
        </Link>
      )}
    </div>
  );
};

export default Header;
