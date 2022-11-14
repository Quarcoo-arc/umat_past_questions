import Header from "../components/Header";
import { Footer } from "../components/index";
import { useContext, useEffect, useState } from "react";
import AdminContext from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import QuestionsContext from "../context/QuestionsContext";

const AddQuestions = () => {
  const navigate = useNavigate();

  const { isAdmin } = useContext(AdminContext);
  const { addNewQuestions } = useContext(QuestionsContext);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/admin");
    }
  }, [isAdmin, navigate]);

  const [formData, setFormData] = useState({
    departments: [],
    level: "",
    semester: "",
    files: [],
  });

  const [inputText, setInputText] = useState("No file chosen!");
  const { departments, semester, level, files } = formData;

  const changeDepartment = (event) => {
    if (!departments.includes(event.target.value)) {
      setFormData((prev) => ({
        ...prev,
        departments: [...departments, event.target.value],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        departments: departments.filter((el) => el !== event.target.value),
      }));
    }
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

  const changeFiles = (event) => {
    if (event.target.files.length === 0) {
      setInputText("No file chosen!");
      setFormData((prev) => ({ ...prev, files: [] }));
    } else {
      setInputText(
        event.target.files.length === 1
          ? event.target.files[0].name
          : event.target.files.length + " files"
      );
      setFormData((prev) => ({ ...prev, files: [...event.target.files] }));
    }
  };

  const addQuestions = (event) => {
    event.preventDefault();
    if (!(departments.length && semester && level && files.length)) {
      alert("Fill in the missing portions");
    } else {
      /* TODO: Create Add to firestore functionality */
      addNewQuestions(formData);
      alert("Success!");
      setFormData({
        departments: [],
        level: "",
        semester: "",
        files: [],
      });
      setInputText("No file chosen!");
    }
  };

  return (
    <div>
      <div className="background-red">
        <Header isLoggedIn={isAdmin} isAdmin={isAdmin} />
        <form action="" className="form-select">
          <h2>Select your Department(s)</h2>
          <div className="buttonGroup">
            <div className="row">
              <button
                type="button"
                className={
                  departments.includes("RENEWABLE ENGINEERING")
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
                  departments.includes("COMPUTER SCIENCE & ENG.")
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
                  departments.includes("ELECTRICAL ENGINEERING")
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
                  departments.includes("MATHEMATICS")
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
                  departments.includes("MECHANICAL ENGINEERING")
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
                  departments.includes("GEOMATIC ENGINEERING")
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
                  departments.includes("GEOLOGICAL ENGINEERING")
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
                  departments.includes("MINING ENGINEERING")
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
                  departments.includes("MINERALS ENGINEERING")
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
                  departments.includes("ENV. & SAFETY ENG.")
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
                  departments.includes("PETROLEUM ENGINEERING")
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
                  departments.includes("GENERAL DRILLING")
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
                  value="LEVEL 100"
                  checked={level === "LEVEL 100"}
                  onChange={changeLevel}
                />{" "}
                100
              </div>
              <div className="radio-button" onClick={changeLevel}>
                <input
                  type="radio"
                  name="level"
                  id="level"
                  value="LEVEL 200"
                  checked={level === "LEVEL 200"}
                  onChange={changeLevel}
                />{" "}
                200
              </div>
              <div className="radio-button" onClick={changeLevel}>
                <input
                  type="radio"
                  name="level"
                  id="level"
                  value="LEVEL 300"
                  checked={level === "LEVEL 300"}
                  onChange={changeLevel}
                />{" "}
                300
              </div>
              <div className="radio-button" onClick={changeLevel}>
                <input
                  type="radio"
                  name="level"
                  id="level"
                  value="LEVEL 400"
                  checked={level === "LEVEL 400"}
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
                  value="1ST SEMESTER"
                  checked={semester === "1ST SEMESTER"}
                  onChange={changeSemester}
                />
                1ST SEMESTER
              </div>
              <div className="radio-button" onClick={changeSemester}>
                <input
                  type="radio"
                  name="semester"
                  id="semester"
                  value="2ND SEMESTER"
                  checked={semester === "2ND SEMESTER"}
                  onChange={changeSemester}
                />
                2ND SEMESTER
              </div>
            </div>
          </div>
          <div className="button-wrapper">
            <input
              className="file-input"
              type="file"
              id="aa"
              onChange={changeFiles}
              multiple
              max="10"
            />
            <label className="reference" htmlFor="aa">
              CHOOSE A FILE
            </label>
            <label id="fileLabel">{inputText}</label>
          </div>
          <button
            type="submit"
            className="view formButton"
            onClick={addQuestions}
          >
            ADD
          </button>
        </form>
      </div>
      <Footer isLoggedIn={isAdmin} />
    </div>
  );
};

export default AddQuestions;
