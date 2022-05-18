import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as AvatarIcon } from "../assets/svgs/AvatarIcon.svg";
import { ReactComponent as UmatLogo } from "../assets/svgs/UmatLogo.svg";
import { ReactComponent as FacebookLogo } from "../assets/svgs/FacebookLogo.svg";
import { ReactComponent as TwitterLogo } from "../assets/svgs/TwitterLogo.svg";
import InstagramLogo from "../assets/images/InstagramLogo.png";
import { ReactComponent as Line } from "../assets/svgs/Line.svg";
import { getAuth } from "firebase/auth";
import AdminContext from "../context/AdminContext";
import { useContext } from "react";

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
    <div className="background-footer">
      <div className="row">
        <div className="column">
          <AvatarIcon width="3rem" className="avatar" />
          {isLoggedIn ? (
            <span onClick={logout} className="red logout clickable">
              Logout
            </span>
          ) : (
            <div className="row">
              <Link to="/register" className="light-green">
                Register
              </Link>
              &nbsp;|&nbsp;
              <Link to="/sign-in" className="red">
                Login
              </Link>
            </div>
          )}
        </div>
        <UmatLogo width="6rem" />
        <div className="row-footer">
          <FacebookLogo width="1.8rem" className="social" />
          <img src={InstagramLogo} className="social icon-small" alt="" />
          <TwitterLogo width="1.8rem" className="social" />
        </div>
      </div>
      <div className="center">
        <p>Knowledge | Truth | Excellence</p>
        <div className="row">
          <Line />
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
