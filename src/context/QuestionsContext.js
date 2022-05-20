import { collection, getDocs, query } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
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
        console.log(querySnap.docs[0].id);
        setQuestions(questions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuestions();
  }, []);

  const addNewQuestions = (arr) => {
    //Check if files exist in firebase storage
    //Copy file url to document
    //Else
    //Upload file to firebase storage
    const storage = getStorage();
    arr.files.forEach((file) => {
      const storageRef = ref(storage, `past_questions/${file.name}`);

      uploadBytes(storageRef, file)
        .then((snapshot) => {
          console.log("Uploaded file: " + file.name + " successfully!");
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
          });
        })
        .catch((error) => console.log(error));
    });
    //Add file url to documents
    console.log("Adding questions to database...");
  };

  return (
    <QuestionsContext.Provider
      value={{
        questions,
        setQuestions,
        addNewQuestions,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export default QuestionsContext;
