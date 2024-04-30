import {
  Footer,
  Header,
  Question,
  StatisticCard,
} from "../../components/index";
import { ReactComponent as DeleteIcon } from "../../assets/svgs/DeleteIcon.svg";
import { ReactComponent as PlusIcon } from "../../assets/svgs/PlusIcon.svg";
import { ReactComponent as DropDownArrow } from "../../assets/svgs/DropDownArrow.svg";
import { ReactComponent as SpinIcon } from "../../assets/svgs/SpinIcon.svg";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminContext from "../../context/AdminContext";
import QuestionsContext from "../../context/QuestionsContext";
import styles from "./AdminDashboard.module.css";
import { LEVELS, PROGRAMS } from "../../utils/constants";

const AdminDashboard = () => {
  // TODO: Check if course name, level and semester are valid

  const { isAdmin } = useContext(AdminContext);
  const { questions, loadQuestions, deleteQuestions } =
    useContext(QuestionsContext);
  const navigate = useNavigate();
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const [selected, setSelected] = useState({
    Level: "Level",
    Department: "Department",
    Semester: "Semester",
  });

  const { Level, Department, Semester } = selected;

  useEffect(() => {
    if (!isAdmin) {
      navigate("/admin");
    }
  }, [isAdmin, navigate]);

  const showDropdown = (event) => {
    console.log(
      event.target,
      `.${styles["drop-down-container"]}`,
      event.target.closest(`div .${styles["drop-down-container"]}`),
      event.target.matches(`.${styles["drop-down-container"]}`)
    );
    let dropdownContainer = event.target.closest(`div`);
    if (dropdownContainer) {
      // Toggle display dropdown list
      dropdownContainer.children[
        dropdownContainer.children.length - 1
      ].classList.toggle(styles.active);
      // Rotate dropdown arror
      dropdownContainer.children[
        dropdownContainer.children.length - 2
      ].classList.toggle(styles.rotate);
    }
    // if (event.target.matches("svg")) {
    //   event.target.parentElement.children[
    //     event.target.parentElement.children.length - 1
    //   ].classList.toggle(styles.active);

    //   event.target.classList.toggle(styles.rotate);
    // } else if (event.target.matches(".selected")) {
    //   event.target.parentElement.children[
    //     event.target.parentElement.children.length - 1
    //   ].classList.toggle(styles.active);

    //   event.target.nextSibling.classList.toggle(styles.rotate);
    // } else if (event.target.matches(`.${styles["drop-down-container"]}`)) {
    //   event.target.lastElementChild.classList.toggle(styles.active);

    //   event.target.lastElementChild.previousSibling.classList.toggle(
    //     styles.rotate
    //   );
    // } else if (event.target.matches("path")) {
    //   event.target.parentElement.parentElement.children[
    //     event.target.parentElement.parentElement.children.length - 1
    //   ].classList.toggle(styles.active);

    //   event.target.parentElement.classList.toggle(styles.rotate);
    // }
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
      event.target.parentElement.classList.add(styles.rotate);
      setTimeout(() => {
        event.target.parentElement.classList.remove(styles.rotate);
      }, 2000);
    } else {
      event.target.classList.add(styles.rotate);
      setTimeout(() => {
        event.target.classList.remove(styles.rotate);
      }, 2000);
    }
    loadQuestions(Department, Level, Semester);
  };

  const addNew = () => navigate("/add-questions");

  const selectQuestion = (event) => {
    if (selectedQuestions.includes(event.target.dataset.url)) {
      setSelectedQuestions(
        selectedQuestions.filter((quest) => quest !== event.target.dataset.url)
      );
    } else {
      setSelectedQuestions((prev) => [...prev, event.target.dataset.url]);
    }
  };

  const deleteSelected = () => {
    deleteQuestions(selected, selectedQuestions);
    setSelectedQuestions([]);
  };

  const statistics = [
    { group: "STUDENTS", count: "5,000" },
    { group: "PAST QUESTIONS", count: "14,000" },
    { group: "ADMINISTRATORS", count: "10" },
  ];

  return (
    <div>
      <div className="background-red">
        <Header isLoggedIn={isAdmin} isAdmin={isAdmin} />
        <form action="" className={styles.form}>
          <div className={styles.statistics}>
            {/* Cards showing statistics */}
            {statistics.map((el, idx) => (
              <StatisticCard key={idx} count={el.count} group={el.group} />
            ))}
          </div>
          <div className={styles.row}>
            <div
              className={`${styles["drop-down-container"]}`}
              onClick={showDropdown}
            >
              <p className="selected">{Department}</p>
              <DropDownArrow width="2rem" className={styles.dropdown} />
              <div className={styles.dropdownContent}>
                {PROGRAMS.map((course, index) => (
                  <p onClick={setDepartment} key={index}>
                    {course}
                  </p>
                ))}
              </div>
            </div>
            <div
              className={`${styles["drop-down-container"]}`}
              onClick={showDropdown}
            >
              <p className="selected">{Level}</p>
              <DropDownArrow width="2rem" className={styles.dropdown} />
              <div className={`${styles.dropdownContent}`}>
                {LEVELS.map((l, idx) => (
                  <p key={idx} onClick={setLevel}>
                    {l}
                  </p>
                ))}
              </div>
            </div>
            <div
              className={`${styles["drop-down-container"]} ${styles.medium}`}
              onClick={showDropdown}
            >
              <p className="selected">{Semester}</p>
              <DropDownArrow width="2rem" className={styles.dropdown} />
              <div className={styles.dropdownContent}>
                <p onClick={setSemester}>1ST SEMESTER</p>
                <p onClick={setSemester}>2ND SEMESTER</p>
              </div>
            </div>
            <SpinIcon
              className={styles.clickable}
              width="3rem"
              height="2.7rem"
              onClick={filterQuestions}
            />
          </div>
          {/* TODO: Create a select all button / Checkbox */}
          {/* TODO: Create a state variable to be updated upon checking a checkbox */}
          {questions.length ? (
            questions.map((link, index) => (
              <Question
                key={index}
                index={index}
                link={link}
                onChange={selectQuestion}
                checked={selectedQuestions.includes(link)}
              />
            ))
          ) : (
            <h1 className={`${styles.question} ${styles.heading}`}>
              No questions available yet!
            </h1>
          )}
          {/* Add & Delete Buttons & Functionalities */}
          <div className={styles.buttons}>
            <DeleteIcon
              width="3rem"
              className={styles.clickable}
              onClick={deleteSelected}
            />
            <PlusIcon
              width="3rem"
              className={styles.clickable}
              onClick={addNew}
            />
          </div>
        </form>
      </div>
      <Footer isLoggedIn={isAdmin} />
    </div>
  );
};

export default AdminDashboard;
