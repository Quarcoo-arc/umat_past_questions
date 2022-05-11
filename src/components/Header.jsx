import { ReactComponent as UmatLogo } from "../assets/svgs/UmatLogo.svg";
import { ReactComponent as SpeedDialIcon } from "../assets/svgs/SpeedDialIcon.svg";
import { ReactComponent as ToolsIcon } from "../assets/svgs/ToolsIcon.svg";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <div className="row">
      <UmatLogo width="4.5rem" />
      <h1 className="title">Past Questions Database</h1>
      {!props.isLoggedIn && (
        <a href="/sign-in" className="action-top">
          Login
        </a>
      )}
      {props.isLoggedIn && props.isAdmin && (
        <Link to="/admin-dashboard">
          <ToolsIcon width="3.5rem" />
        </Link>
      )}
      {props.isLoggedIn && !props.isAdmin && (
        <Link to="/user-dashboard">
          <SpeedDialIcon width="4rem" height="156" />
        </Link>
      )}
    </div>
  );
};

export default Header;
