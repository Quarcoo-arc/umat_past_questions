import Header from "../components/Header";
import Footer from "../components/Footer";

const UserDashboard = () => {
  return (
    <div>
      <div className="background-red">
        <Header isLoggedIn={true} isAdmin={false} />
        <form action="" className="select">
          <h2>Select your Department</h2>
          <div className="row">
            <input type="button" value="RENEWABLE ENGINEERING" />
            <input type="button" value="COMPUTER SCIENCE & ENG." />
            <input type="button" value="ELECTRICAL ENGINEERING" />
          </div>
          <div className="row">
            <input type="button" value="MATHEMATICS" />
            <input type="button" value="MECHANICAL ENGINEERING" />
            <input type="button" value="GEOMATIC ENGINEERING" />
          </div>
          <div className="row">
            <input type="button" value="GEOLOGICAL ENGINEERING" />
            <input type="button" value="MINING ENGINEERING" />
            <input type="button" value="MINERALS ENGINEERING" />
          </div>
          <div className="row">
            <input type="button" value="ENV. & SAFETY ENG." />
            <input type="button" value="PETROLEUM ENGINEERING" />
            <input type="button" value="GENERAL DRILLING" />
          </div>
        </form>
      </div>
      <Footer isLoggedIn={false} />
    </div>
  );
};

export default UserDashboard;
