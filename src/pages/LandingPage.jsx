import Header from "../components/Header";
import books from "../assets/images/Books.png";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const onClick = () => navigate("/user-dashboard");

  return (
    <div>
      <div className="background-red">
        <Header isLoggedIn={false} isAdmin={false} />
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
      <Footer isLoggedIn={false} />
    </div>
  );
};

export default LandingPage;
