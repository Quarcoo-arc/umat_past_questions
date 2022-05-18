import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";

const UserDashboard = () => {
  const [formData, setFormData] = useState({
    department: "",
    level: null,
    semester: null,
  });

  const { department, semester, level } = formData;

  const changeDepartment = (event) => {
    setFormData((prev) => ({ ...prev, department: event.target.value }));
  };

  const changeLevel = (event) => {
    setFormData((prev) => ({
      ...prev,
      level: event.target.value
        ? event.target.value
        : event.target.firstChild.value,
    }));
  };

  const changeSemester = (event) => {
    setFormData((prev) => ({
      ...prev,
      semester: event.target.value
        ? event.target.value
        : event.target.firstChild.value,
    }));
  };

  const viewQuestions = (event) => {
    event.preventDefault();
    if (!(department && semester && level)) {
      alert("Fill in the missing fields");
    } else {
      alert("Success!");
    }
  };

  return (
    <div>
      <div className="background-red">
        <Header isLoggedIn={true} isAdmin={false} />
        <form action="" className="form-select">
          <h2>Select your Department</h2>
          <div className="buttonGroup">
            <div className="row">
              <button
                type="button"
                className={
                  department === "RENEWABLE ENGINEERING"
                    ? "formButton active"
                    : "formButton"
                }
                id="department"
                value="RENEWABLE ENGINEERING"
                onClick={changeDepartment}
              >
                RENEWABLE ENGINEERING
              </button>
              <button
                type="button"
                className={
                  department === "COMPUTER SCIENCE & ENG."
                    ? "formButton active"
                    : "formButton"
                }
                id="department"
                value="COMPUTER SCIENCE & ENG."
                onClick={changeDepartment}
              >
                COMPUTER SCIENCE & ENG.
              </button>
              <button
                type="button"
                className={
                  department === "ELECTRICAL ENGINEERING"
                    ? "formButton active"
                    : "formButton"
                }
                id="department"
                value="ELECTRICAL ENGINEERING"
                onClick={changeDepartment}
              >
                ELECTRICAL ENGINEERING
              </button>
            </div>
            <div className="row">
              <button
                type="button"
                className={
                  department === "MATHEMATICS"
                    ? "formButton active"
                    : "formButton"
                }
                id="department"
                value="MATHEMATICS"
                onClick={changeDepartment}
              >
                MATHEMATICS
              </button>
              <button
                type="button"
                className={
                  department === "MECHANICAL ENGINEERING"
                    ? "formButton active"
                    : "formButton"
                }
                id="department"
                value="MECHANICAL ENGINEERING"
                onClick={changeDepartment}
              >
                MECHANICAL ENGINEERING
              </button>
              <button
                type="button"
                className={
                  department === "GEOMATIC ENGINEERING"
                    ? "formButton active"
                    : "formButton"
                }
                id="department"
                value="GEOMATIC ENGINEERING"
                onClick={changeDepartment}
              >
                GEOMATIC ENGINEERING
              </button>
            </div>
            <div className="row">
              <button
                type="button"
                className={
                  department === "GEOLOGICAL ENGINEERING"
                    ? "formButton active"
                    : "formButton"
                }
                id="department"
                value="GEOLOGICAL ENGINEERING"
                onClick={changeDepartment}
              >
                GEOLOGICAL ENGINEERING
              </button>
              <button
                type="button"
                className={
                  department === "MINING ENGINEERING"
                    ? "formButton active"
                    : "formButton"
                }
                id="department"
                value="MINING ENGINEERING"
                onClick={changeDepartment}
              >
                MINING ENGINEERING
              </button>
              <button
                type="button"
                className={
                  department === "MINERALS ENGINEERING"
                    ? "formButton active"
                    : "formButton"
                }
                id="department"
                value="MINERALS ENGINEERING"
                onClick={changeDepartment}
              >
                MINERALS ENGINEERING
              </button>
            </div>
            <div className="row">
              <button
                type="button"
                className={
                  department === "ENV. & SAFETY ENG."
                    ? "formButton active"
                    : "formButton"
                }
                id="department"
                value="ENV. & SAFETY ENG."
                onClick={changeDepartment}
              >
                ENV. & SAFETY ENG.
              </button>
              <button
                type="button"
                className={
                  department === "PETROLEUM ENGINEERING"
                    ? "formButton active"
                    : "formButton"
                }
                id="department"
                value="PETROLEUM ENGINEERING"
                onClick={changeDepartment}
              >
                PETROLEUM ENGINEERING
              </button>
              <button
                type="button"
                className={
                  department === "GENERAL DRILLING"
                    ? "formButton active"
                    : "formButton"
                }
                id="department"
                value="GENERAL DRILLING"
                onClick={changeDepartment}
              >
                GENERAL DRILLING
              </button>
            </div>
          </div>
          <h2>Select your Level</h2>
          <div className="buttonGroup">
            <div className="row">
              <div className="radio-button" onClick={changeLevel}>
                <input
                  type="radio"
                  name="level"
                  id="level"
                  value="100"
                  checked={level === "100"}
                  onChange={changeLevel}
                />{" "}
                100
              </div>
              <div className="radio-button" onClick={changeLevel}>
                <input
                  type="radio"
                  name="level"
                  id="level"
                  value="200"
                  checked={level === "200"}
                  onChange={changeLevel}
                />{" "}
                200
              </div>
              <div className="radio-button" onClick={changeLevel}>
                <input
                  type="radio"
                  name="level"
                  id="level"
                  value="300"
                  checked={level === "300"}
                  onChange={changeLevel}
                />{" "}
                300
              </div>
              <div className="radio-button" onClick={changeLevel}>
                <input
                  type="radio"
                  name="level"
                  id="level"
                  value="400"
                  checked={level === "400"}
                  onChange={changeLevel}
                />{" "}
                400
              </div>
            </div>
          </div>
          <h2>Semester</h2>
          <div className="buttonGroup">
            <div className="row">
              <div className="radio-button" onClick={changeSemester}>
                <input
                  type="radio"
                  name="semester"
                  id="semester"
                  value="1"
                  checked={semester === "1"}
                  onChange={changeSemester}
                />
                1ST SEMESTER
              </div>
              <div className="radio-button" onClick={changeSemester}>
                <input
                  type="radio"
                  name="semester"
                  id="semester"
                  value="2"
                  checked={semester === "2"}
                  onChange={changeSemester}
                />
                2ND SEMESTER
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="view formButton"
            onClick={viewQuestions}
          >
            VIEW QUESTIONS
          </button>
        </form>
      </div>
      <Footer isLoggedIn={true} />
    </div>
  );
};

export default UserDashboard;
