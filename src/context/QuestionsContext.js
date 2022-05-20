import { collection, getDocs, query } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../firebase.config";

const QuestionsContext = createContext();

export const QuestionsContextProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionsRef = collection(db, "past_questions");

        const q = query(questionsRef);

        const querySnap = await getDocs(q);

        const questions = [];

        querySnap.forEach((doc) => questions.push(doc.data()));

        setQuestions(questions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuestions();
  }, []);

  return (
    <QuestionsContext.Provider
      value={{
        questions,
        setQuestions,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export default QuestionsContext;
