/* eslint-disable react-hooks/rules-of-hooks */
import Header from "../components/Header";
import Footer from "../components/Footer";
import { collection, getDocs, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase.config";

const viewQuestions = () => {
  const { level, semester, department } = useParams();
  const [questions, setQuestions] = useState("No questions available!");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionsRef = collection(db, "past_questions");

        const q = query(questionsRef);

        const querySnap = await getDocs(q);

        const questions = [];

        querySnap.forEach((doc) => questions.push(doc.data()));

        setQuestions(questions);
        // console.log(
        //   decodeURIComponent(
        //     questions[0][department][semester][level][5].slice(
        //       questions[0][department][semester][level][5].indexOf("F") + 1,
        //       questions[0][department][semester][level][5].lastIndexOf("?")
        //     )
        //   )
        // );
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuestions();
  }, [department, level, semester]);

  const downloadQuestions = (event) => {
    event.preventDefault();
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
    alert("Thanks for your message!");
  };

  console.log(questions);

  // TODO: Check if course name, level and semester are valid
  return (
    <div>
      <div className="background-red">
        <Header isLoggedIn={true} isAdmin={false} />
        <form action="" className="form-select">
          <div className="col">
            <div className="row center page-title">{department}</div>
            <div className="row center page-title">{level}</div>
            <div className="row center page-title">{semester}</div>
          </div>
          {/* TODO: Create a downloadable link component for the pdfs */}
          {/* TODO: Create a state variable to be updated upon checking a checkbox */}
          {typeof questions === "object" &&
          questions[0][department] !== undefined &&
          questions[0][department][semester] !== undefined &&
          questions[0][department][semester][level] !== undefined &&
          questions[0][department][semester][level].length > 0 ? (
            <>
              {questions[0][department][semester][level].map(
                (question, index) => (
                  <label
                    key={index}
                    htmlFor={`question${index}`}
                    className="question"
                  >
                    <input
                      type="checkbox"
                      name={`question${index}`}
                      id={`question${index}`}
                    />
                    {decodeURIComponent(
                      question.slice(
                        question.indexOf("F") + 1,
                        question.lastIndexOf("?")
                      )
                    )}
                  </label>
                )
              )}
              <button
                type="submit"
                className="view formButton"
                onClick={downloadQuestions}
              >
                DOWNLOAD
              </button>
            </>
          ) : (
            <>
              <h1 className="question">No questions available yet!</h1>
              <button
                type="submit"
                className="view formButton"
                onClick={launchReport}
              >
                REQUEST QUESTIONS
              </button>
            </>
          )}
          {/* <label htmlFor="question1" className="question">
            <input type="checkbox" name="question1" id="question1" />
            2021 Basic Electronics End of First Semester Exams
          </label> */}
        </form>
      </div>
      <Footer isLoggedIn={true} />
    </div>
  );
};

export default viewQuestions;
