import Header from "../components/Header";
import Footer from "../components/Footer";

const AdminDashboard = () => {
  // TODO: Check if course name, level and semester are valid

  return (
    <div>
      <div className="background-red">
        <Header isLoggedIn={true} isAdmin={false} />
        <form action="" className="form-select">
          <div className="row new">
            {/* Cards showing statistics */}
            <div className="stats">
              <h4>STUDENTS</h4>
              <h1>5,000</h1>
            </div>
            <div className="stats">
              <h4>PAST QUESTIONS</h4>
              <h1>1,000</h1>
            </div>
            <div className="stats">
              <h4>ADMINISTRATORS</h4>
              <h1>5</h1>
            </div>
          </div>
          {/* TODO: Create a downloadable link component for the pdfs */}
          {/* TODO: Create a state variable to be updated upon checking a checkbox */}
          <label htmlFor="question1" className="question">
            <input type="checkbox" name="question1" id="question1" />
            2021 Basic Electronics End of First Semester Exams
          </label>
          <label htmlFor="question2" className="question">
            <input type="checkbox" name="question2" id="question2" />
            2021 Basic Electronics End of First Semester Exams
          </label>
          <label htmlFor="question3" className="question">
            <input type="checkbox" name="question3" id="question3" />
            2021 Basic Electronics End of First Semester Exams
          </label>
          <label htmlFor="question4" className="question">
            <input type="checkbox" name="question4" id="question4" />
            2021 Basic Electronics End of First Semester Exams
          </label>
          {/* Add & Delete Buttons & Functionalities */}
        </form>
      </div>
      <Footer isLoggedIn={true} />
    </div>
  );
};

export default AdminDashboard;
