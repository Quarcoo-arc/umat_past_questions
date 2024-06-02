import {
  Footer,
  Header,
  Question,
  SelectInput,
  StatisticCard,
} from "../../components/index";
import { ReactComponent as DeleteIcon } from "../../assets/svgs/DeleteIcon.svg";
import { ReactComponent as PlusIcon } from "../../assets/svgs/PlusIcon.svg";
import { ReactComponent as SpinIcon } from "../../assets/svgs/SpinIcon.svg";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminContext from "../../context/AdminContext";
import QuestionsContext from "../../context/QuestionsContext";
import styles from "./AdminDashboard.module.css";
import { LEVELS, PROGRAMS, SEMESTERS } from "../../utils/constants";

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
  const [loadingQuestions, setloadingQuestions] = useState(false);

  const { Level, Department, Semester } = selected;

  useEffect(() => {
    if (!isAdmin) {
      navigate("/admin");
    }
  }, [isAdmin, navigate]);

  const changeSelected = (type, val) => {
    setSelected((prev) => ({ ...prev, [type]: val }));
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
    setloadingQuestions(true);
    setTimeout(() => {
      setloadingQuestions(false);
    }, 2000);
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
            <SelectInput
              options={PROGRAMS}
              selectItem={changeSelected}
              type="Department"
              selected={Department}
            />
            <SelectInput
              options={LEVELS}
              selectItem={changeSelected}
              type="Level"
              selected={Level}
            />
            <SelectInput
              options={SEMESTERS}
              selectItem={changeSelected}
              type="Semester"
              selected={Semester}
            />
            <SpinIcon
              className={`${styles.clickable} ${
                loadingQuestions ? styles.rotate : ""
              }`}
              width="3rem"
              height="2.7rem"
              onClick={filterQuestions}
            />
          </div>
          {/* TODO: Create a select all button / Checkbox */}
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
            <h1 className={styles.heading}>No questions available yet!</h1>
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
