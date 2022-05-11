import Header from "../components/Header";
import books from "../assets/images/Books.png";

const LandingPage = () => {
  return (
    <div>
      <div className="background-red">
        <Header isLoggedIn={false} isAdmin={false} />
        <div className="content">
          <img src={books} alt="" className="books" />
          <div className="col new">
            <p>Get access to Past Questions in all courses!</p>
            <button className="auth">GET STARTED</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
