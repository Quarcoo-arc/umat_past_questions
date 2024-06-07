/* eslint-disable react-hooks/rules-of-hooks */
import styles from "./ViewQuestions.module.css";
import { Footer, Header, Question } from "../../components/index";
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import QuestionsContext from "../../context/QuestionsContext";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";

const ViewQuestions = () => {
  const { level, semester, department } = useParams();
  const { questions, loadQuestions } = useContext(QuestionsContext);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const storage = getStorage();

  useEffect(() => {
    loadQuestions(department, level, semester);
  }, [department, level, semester]);

  const downloadQuestions = (event) => {
    event.preventDefault();
    if (selectedQuestions.length === 0) {
      toast.error("No questions selected!");
      return;
    }
    //Download Questions
    selectedQuestions.forEach((question) => {
      getDownloadURL(ref(storage, question))
        .then((url) => {
          const xhr = new XMLHttpRequest();
          xhr.responseType = "blob";
          xhr.onload = (event) => {
            const blob = xhr.response;
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
              "download",
              decodeURIComponent(
                question.slice(
                  question.indexOf("F") + 1,
                  question.lastIndexOf("?")
                )
              )
            );

            // Append to html link element page
            document.body.appendChild(link);

            // Start download
            link.click();
          };

          xhr.open("GET", url);
          xhr.send();
        })
        .catch((error) => {
          console.log(error);
          toast.error("Failed to download file!");
        });
    });

    //Reset Files to be downloaded
    setSelectedQuestions([]);
  };

  const launchReport = (event) => {
    event.preventDefault();
    const subject = `Request for Past Questions for ${department} ${level} ${semester.toLowerCase()}`;
    const body = `Hi there!
    I would like for past questions for ${department} ${level} ${semester.toLowerCase()} to be added to the UMaT Past Questions Database, if any are available.
    Thanks.`;
    window.open(
      `mailto:michaelquarcoo04@gmail.com?subject=${subject}&body=${body}`
    );
    toast("Thanks for your message!");
  };

  const selectQuestion = (event) => {
    if (selectedQuestions.includes(event.target.dataset.url)) {
      setSelectedQuestions(
        selectedQuestions.filter((quest) => quest !== event.target.dataset.url)
      );
    } else {
      setSelectedQuestions((prev) => [...prev, event.target.dataset.url]);
    }
  };

  // TODO: Check if course name, level and semester are valid
  return (
    <div>
      <div className="background-red">
        <Header isLoggedIn={true} isAdmin={false} />
        <form action="" className={styles.form}>
          <div className="col">
            <div className={styles.title}>{department}</div>
            <div className={styles.title}>{level}</div>
            <div className={styles.title}>{semester}</div>
          </div>
          {/* TODO: Create a downloadable link component for the pdfs */}
          {questions.length > 0 ? (
            <>
              {questions.map((link, index) => (
                <Question
                  key={index}
                  index={index}
                  link={link}
                  onChange={selectQuestion}
                  checked={selectedQuestions.includes(link)}
                />
              ))}
              <button
                type="submit"
                className={styles.formButton}
                onClick={downloadQuestions}
              >
                DOWNLOAD
              </button>
            </>
          ) : (
            <>
              <h1 className={`${styles.question} ${styles.heading}`}>
                No questions available yet!
              </h1>
              <button
                type="submit"
                className={styles.formButton}
                onClick={launchReport}
              >
                REQUEST QUESTIONS
              </button>
            </>
          )}
        </form>
      </div>
      <Footer isLoggedIn={true} />
    </div>
  );
};

export default ViewQuestions;
