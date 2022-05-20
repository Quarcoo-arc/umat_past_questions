/* eslint-disable react-hooks/rules-of-hooks */
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import QuestionsContext from "../context/QuestionsContext";

const viewQuestions = () => {
  const { level, semester, department } = useParams();
  const { questions } = useContext(QuestionsContext);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [checkedInputs, setCheckedInputs] = useState([]);

  const downloadQuestions = (event) => {
    event.preventDefault();
    if (selectedQuestions.length === 0) {
      alert("No questions selected!");
      return;
    }
    //Download Questions
    selectedQuestions.forEach((question) => {
      fetch(question, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
        },
        mode: "no-cors",
      })
        .then((response) => response.blob())
        .then((blob) => {
          // Create blob link to download
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

          // Clean up and remove the link
          link.parentNode.removeChild(link);
          // window.location.reload();
        });
    });

    //Uncheck checkboxes
    checkedInputs.map((input) => (input.checked = false));
    setCheckedInputs([]);
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
    alert("Thanks for your message!");
  };

  const selectQuestion = (event) => {
    if (selectedQuestions.includes(event.target.dataset.url)) {
      setCheckedInputs(checkedInputs.filter((input) => input !== event.target));
      setSelectedQuestions(
        selectedQuestions.filter((quest) => quest !== event.target.dataset.url)
      );
    } else {
      setCheckedInputs((prev) => [...prev, event.target]);
      setSelectedQuestions((prev) => [...prev, event.target.dataset.url]);
    }
  };

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
          {questions.length > 0 &&
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
                      onChange={selectQuestion}
                      data-url={question}
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
        </form>
      </div>
      <Footer isLoggedIn={true} />
    </div>
  );
};

export default viewQuestions;
