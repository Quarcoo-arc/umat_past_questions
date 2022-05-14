import Header from "../components/Header";
import Footer from "../components/Footer";

const viewQuestions = () => {
  const downloadQuestions = (event) => {
    event.preventDefault();
  };

  // TODO: Check if course name, level and semester are valid

  return (
    <div>
      <div className="background-red">
        <Header isLoggedIn={true} isAdmin={false} />
        <form action="" className="form-select">
          <div className="col">
            <div className="row center page-title">COMPUTER SCIENCE & ENG.</div>
            <div className="row center page-title">LEVEL 300</div>
            <div className="row center page-title">1ST SEMESTER</div>
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
          <button
            type="submit"
            className="view formButton"
            onClick={downloadQuestions}
          >
            DOWNLOAD
          </button>
        </form>
      </div>
      <Footer isLoggedIn={true} />
    </div>
  );
};

export default viewQuestions;
