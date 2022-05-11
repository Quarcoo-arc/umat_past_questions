import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="row">
        <div className="col">
          <img src="" alt="user-icon" />
          <Link to="/register">Register</Link> |{" "}
          <Link to="/sign-in">Login</Link>
        </div>
        <img src="" alt="umat-logo" />
        <div className="row">
          <img src="" alt="facebook" />
          <img src="" alt="instagram" />
          <img src="" alt="twitter" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
