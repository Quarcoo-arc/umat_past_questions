import Header from "../components/Header";
import Footer from "../components/Footer";
import { ReactComponent as DeleteIcon } from "../assets/svgs/DeleteIcon.svg";
import { ReactComponent as PlusIcon } from "../assets/svgs/PlusIcon.svg";
import { ReactComponent as DropDownArrow } from "../assets/svgs/DropDownArrow.svg";

const AdminDashboard = () => {
  // TODO: Check if course name, level and semester are valid

  const showDropdown = (event) => {
    console.log(event.target);
    if (event.target.matches("svg, p")) {
      event.target.parentElement.children[
        event.target.parentElement.children.length - 1
      ].classList.toggle("active");
    } else if (event.target.matches("div")) {
      event.target.lastElementChild.classList.toggle("active");
    } else if (event.target.matches("path")) {
      event.target.parentElement.parentElement.children[
        event.target.parentElement.parentElement.children.length - 1
      ].classList.toggle("active");
    }
  };

  const courses = [
    "RENEWABLE ENGINEERING",
    "COMPUTER SCIENCE & ENG.",
    "ELECTRICAL ENGINEERING",
    "MATHEMATICS",
    "MECHANICAL ENGINEERING",
    "GEOMATIC ENGINEERING",
    "GEOLOGICAL ENGINEERING",
    "MINING ENGINEERING",
    "MINERALS ENGINEERING",
    "ENV. & SAFETY ENG.",
    "PETROLEUM ENGINEERING",
    "GENERAL DRILLING",
  ];

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
          <div className="row new">
            <div className="drop-down-container" onClick={showDropdown}>
              <p>Department</p>
              <DropDownArrow width="2rem" className="dropdown" />
              <div className="dropdownContent">
                {courses.map((course) => (
                  <p>{course}</p>
                ))}
              </div>
            </div>
            <div className="drop-down-container" onClick={showDropdown}>
              <p>Level</p>
              <DropDownArrow width="2rem" className="dropdown" />
              <div className="dropdownContent">
                <p>100</p>
                <p>200</p>
                <p>300</p>
              </div>
            </div>
            <div className="drop-down-container" onClick={showDropdown}>
              <p>Semester</p>
              <DropDownArrow width="2rem" className="dropdown" />
              <div className="dropdownContent">
                <p>1ST SEMESTER</p>
                <p>2ND SEMESTER</p>
              </div>
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
          <div className="row new buttons">
            <DeleteIcon width="3rem" />
            <PlusIcon width="3rem" />
          </div>
        </form>
      </div>
      <Footer isLoggedIn={true} />
    </div>
  );
};

export default AdminDashboard;
