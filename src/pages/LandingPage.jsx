import Header from "../components/Header";

const LandingPage = () => {
  return (
    <div>
      <div className="background-red">
        <Header isLoggedIn={false} isAdmin={false} />
        <div className="content"></div>
      </div>
    </div>
  );
};

export default LandingPage;
