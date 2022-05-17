import Header from "../components/Header";
import Footer from "../components/Footer";
import { ReactComponent as DeleteIcon } from "../assets/svgs/DeleteIcon.svg";
import { ReactComponent as PlusIcon } from "../assets/svgs/PlusIcon.svg";
import { ReactComponent as DropDownArrow } from "../assets/svgs/DropDownArrow.svg";
import { ReactComponent as SpinIcon } from "../assets/svgs/SpinIcon.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  // TODO: Check if course name, level and semester are valid

  const [selected, setSelected] = useState({
    Level: "Level",
    Department: "Department",
    Semester: "Semester",
  });

  const navigate = useNavigate();

  const { Level, Department, Semester } = selected;

  const showDropdown = (event) => {
    if (event.target.matches("svg")) {
      event.target.parentElement.children[
        event.target.parentElement.children.length - 1
      ].classList.toggle("active");

      event.target.classList.toggle("rotate");
    } else if (event.target.matches(".selected")) {
      event.target.parentElement.children[
        event.target.parentElement.children.length - 1
      ].classList.toggle("active");

      event.target.nextSibling.classList.toggle("rotate");
    } else if (event.target.matches(".drop-down-container")) {
      event.target.lastElementChild.classList.toggle("active");

      event.target.lastElementChild.previousSibling.classList.toggle("rotate");
    } else if (event.target.matches("path")) {
      event.target.parentElement.parentElement.children[
        event.target.parentElement.parentElement.children.length - 1
      ].classList.toggle("active");

      event.target.parentElement.classList.toggle("rotate");
    }
  };

  const setLevel = (event) => {
    setSelected((prev) => ({ ...prev, Level: event.target.innerText }));
    event.target.parentElement.parentElement.click();
  };
  const setDepartment = (event) => {
    setSelected((prev) => ({ ...prev, Department: event.target.innerText }));
    event.target.parentElement.parentElement.click();
  };
  const setSemester = (event) => {
    setSelected((prev) => ({ ...prev, Semester: event.target.innerText }));
    event.target.parentElement.parentElement.click();
  };

  const filterQuestions = (event) => {
    //Check to see if all fields have been selected
    if (
      Level === "Level" ||
      Department === "Department" ||
      Semester === "Semester"
    ) {
      alert("Please select from the categories available!");
      return;
    }
    if (event.target.matches("path")) {
      event.target.parentElement.classList.add("rotate");
      setTimeout(() => {
        event.target.parentElement.classList.remove("rotate");
      }, 2000);
    } else {
      event.target.classList.add("rotate");
      setTimeout(() => {
        event.target.classList.remove("rotate");
      }, 2000);
    }
  };

  const addNew = () => navigate("/add-questions");

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
            <div className="drop-down-container long" onClick={showDropdown}>
              <p className="selected">{Department}</p>
              <DropDownArrow width="2rem" className="dropdown" />
              <div className="dropdownContent">
                {courses.map((course, index) => (
                  <p onClick={setDepartment} key={index}>
                    {course}
                  </p>
                ))}
              </div>
            </div>
            <div className="drop-down-container small" onClick={showDropdown}>
              <p className="selected">{Level}</p>
              <DropDownArrow width="2rem" className="dropdown" />
              <div className="dropdownContent small">
                <p onClick={setLevel}>100</p>
                <p onClick={setLevel}>200</p>
                <p onClick={setLevel}>300</p>
              </div>
            </div>
            <div className="drop-down-container medium" onClick={showDropdown}>
              <p className="selected">{Semester}</p>
              <DropDownArrow width="2rem" className="dropdown" />
              <div className="dropdownContent">
                <p onClick={setSemester}>1ST SEMESTER</p>
                <p onClick={setSemester}>2ND SEMESTER</p>
              </div>
            </div>
            <SpinIcon
              className="clickable"
              width="3rem"
              height="2.7rem"
              onClick={filterQuestions}
            />
            {/* Filter icon / button : submit button for selection */}
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
            <DeleteIcon width="3rem" className="clickable" />
            <PlusIcon width="3rem" className="clickable" onClick={addNew} />
          </div>
        </form>
      </div>
      <Footer isLoggedIn={true} />
    </div>
  );
};

export default AdminDashboard;
