import { ReactComponent as UmatLogo } from "../../assets/svgs/UmatLogo.svg";
import { ReactComponent as SpeedDialIcon } from "../../assets/svgs/SpeedDialIcon.svg";
import { ReactComponent as ToolsIcon } from "../../assets/svgs/ToolsIcon.svg";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ isLoggedIn, isAdmin }) => {
  return (
    <div className="row">
      <UmatLogo width="4.5rem" />
      <h1 className="title">Past Questions Database</h1>
      {!isLoggedIn && (
        <Link to="/sign-in" className="action-top">
          Login
        </Link>
      )}
      {isLoggedIn && isAdmin && (
        <Link to="/admin-dashboard">
          <ToolsIcon width="3.5rem" />
        </Link>
      )}
      {isLoggedIn && !isAdmin && (
        <Link to="/user-dashboard">
          <SpeedDialIcon width="4rem" height="156" />
        </Link>
      )}
    </div>
  );
};

export default Header;
