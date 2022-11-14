import Header from "../components/Header";
import books from "../assets/images/Books.png";
import { Footer } from "../components/index";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AdminContext from "../context/AdminContext";

const LandingPage = () => {
  const navigate = useNavigate();

  const { isAdmin, isUser } = useContext(AdminContext);

  const onClick = () => navigate("/user-dashboard");

  return (
    <div>
      <div className="background-red">
        <Header isLoggedIn={isUser} isAdmin={isAdmin} />
        <div className="content">
          <img src={books} alt="" className="books" />
          <div className="col new">
            <p>Get access to Past Questions in all courses!</p>
            <button className="auth" onClick={onClick}>
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
