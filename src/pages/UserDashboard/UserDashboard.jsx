import { Footer, Header } from "../../components/index";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserDashboard.module.css";
import { LEVELS, PROGRAMS, SEMESTERS } from "../../utils/constants";
import { ProgramButton, RadioButton } from "../../components/Buttons";
import { toast } from "react-toastify";

const UserDashboard = () => {
  const [formData, setFormData] = useState({
    department: "",
    level: null,
    semester: null,
  });

  const { department, semester, level } = formData;

  const navigate = useNavigate();

  const changeDepartment = (event) => {
    setFormData((prev) => ({ ...prev, department: event.target.value }));
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

  const viewQuestions = (event) => {
    event.preventDefault();
    if (!(department && semester && level)) {
      toast.error("Fill in the missing fields");
    } else {
      navigate(
        `/view-questions/LEVEL ${level}/${department}/${semester}${
          semester === "1" ? "ST" : "ND"
        } SEMESTER`
      );
    }
  };

  return (
    <div>
      <div className="background-red">
        <Header isLoggedIn={true} isAdmin={false} />
        <form action="" className={styles["form-select"]}>
          <h2>Select your Department</h2>
          <div className={styles.buttonGroup}>
            {PROGRAMS.map((p, idx) => (
              <ProgramButton
                key={idx}
                active={department === p}
                onClick={changeDepartment}
                value={p}
              />
            ))}
          </div>
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

          <button
            type="submit"
            className={styles.formButton}
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
