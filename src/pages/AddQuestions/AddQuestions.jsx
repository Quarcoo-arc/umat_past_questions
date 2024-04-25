import { Footer, Header } from "../../components/index";
import { useContext, useEffect, useState } from "react";
import AdminContext from "../../context/AdminContext";
import { useNavigate } from "react-router-dom";
import QuestionsContext from "../../context/QuestionsContext";
import styles from "./AddQuestions.module.css";
import { LEVELS, PROGRAMS, SEMESTERS } from "../../utils/constants";
import { ProgramButton, RadioButton } from "../../components/Buttons";

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
        : event.target.firstChild.value
        ? event.target.firstChild.value
        : event.target.previousSibling.value,
    }));
  };

  const changeSemester = (event) => {
    setFormData((prev) => ({
      ...prev,
      semester: event.target.value
        ? event.target.value
        : event.target.firstChild.value
        ? event.target.firstChild.value
        : event.target.previousSibling.value,
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
        <form action="" className={styles.form}>
          <div className={styles.wrap}>
            <h2>Select your Department(s)</h2>
            <div className={styles.buttonGroup}>
              {PROGRAMS.map((program, idx) => (
                <ProgramButton
                  key={idx}
                  active={departments.includes(program)}
                  value={program}
                  id="department"
                  onClick={changeDepartment}
                />
              ))}
            </div>
          </div>
          <div className={styles.wrap}>
            <h2>Select your Level</h2>
            <div className={styles.levelGroup}>
              {LEVELS.map((l, idx) => (
                <RadioButton
                  key={idx}
                  onClick={changeLevel}
                  id="level"
                  value={l.split(" ")[1]}
                  checked={level === l.split(" ")[1]}
                  text={l.split(" ")[1]}
                />
              ))}
            </div>
          </div>
          <div className={styles.wrap}>
            <h2>Semester</h2>
            <div className={styles.semesterGroup}>
              {SEMESTERS.map((s, idx) => (
                <RadioButton
                  key={idx}
                  id="semester"
                  checked={semester === s[0]}
                  onClick={changeSemester}
                  value={s[0]}
                  text={s}
                />
              ))}
            </div>
          </div>
          <div className={styles.buttonWrapper}>
            <input
              className={styles.fileInput}
              type="file"
              id="aa"
              onChange={changeFiles}
              multiple
              max="10"
            />
            <label className={styles.reference} htmlFor="aa">
              CHOOSE A FILE
            </label>
            <label id={styles.fileLabel}>{inputText}</label>
          </div>
          <button
            type="submit"
            className={styles.formButton}
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
