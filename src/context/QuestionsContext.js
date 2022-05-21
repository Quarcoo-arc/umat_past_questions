import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { createContext, useState } from "react";
import { db } from "../firebase.config";

const QuestionsContext = createContext();

export const QuestionsContextProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [downloadUrls, setDownloadUrls] = useState([]);

  const loadQuestions = async (department, level, semester) => {
    try {
      const questionsRef = doc(db, "past_questions", department);

      const querySnap = await getDoc(questionsRef);

      let questions = [];
      if (
        querySnap.exists() &&
        querySnap.data()[level] &&
        querySnap.data()[level][semester]
      ) {
        questions = [...querySnap.data()[level][semester]];
        console.log("Document data: ", querySnap.data()[level][semester]);
      } else {
        console.log("No such document!");
      }
      console.log(querySnap);
      setQuestions(questions);
    } catch (error) {
      console.log(error);
    }
  };

  const addNewQuestions = async (arr) => {
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
            setDownloadUrls((prev) => [...prev, downloadURL]);
            //If no record is found => create a new document
            //Update document to include record
            //First check to see if the url already exists.
            //console.log(sucess)
          });
        })
        .catch((error) => console.log(error));
    });

    //For each of the selected departments, fetch the associated document
    arr.departments.forEach((department) => {
      loadQuestions(department, arr.level, arr.semester)
        .then(() => {
          const newUrls = downloadUrls.filter((url) =>
            questions.find(
              (question) =>
                question.slice(0, question.indexOf("?")) ===
                url.slice(0, question.indexOf("?"))
            )
              ? false
              : true
          );
          newUrls.length > 0
            ? setDoc(
                doc(db, "past_questions", department),
                {
                  [arr.level]: {
                    [arr.semester]: arrayUnion(...newUrls),
                  },
                },
                { merge: true }
              )
            : console.log("File already exists in database");
        })
        .then(() => {
          console.log(
            "Successfully updated " + department + " document in database!"
          );
        })
        .catch((error) => console.log(error));
    });
    //Add file url to documents
    // await setDoc(doc(db, "past_questions", "COMPUTER SCIENCE & ENG."), {
    //   "LEVEL 100": {
    //     "1ST SEMESTER": [
    //       ...questions[0]["COMPUTER SCIENCE & ENG."]["1ST SEMESTER"][
    //         "LEVEL 100"
    //       ],
    //     ],
    //     "2ND SEMESTER": [
    //       ...questions[0]["COMPUTER SCIENCE & ENG."]["2ND SEMESTER"][
    //         "LEVEL 100"
    //       ],
    //     ],
    //   },
    //   "LEVEL 200": { "1ST SEMESTER": [], "2ND SEMESTER": [] },
    //   "LEVEL 300": { "1ST SEMESTER": [], "2ND SEMESTER": [] },
    //   "LEVEL 400": { "1ST SEMESTER": [], "2ND SEMESTER": [] },
    // })
    //   .then(() => console.log("Added document to collection"))
    //   .catch((error) => console.log(error));
    // console.log("Adding questions to database...");
    setQuestions([]);
    setDownloadUrls([]);
  };

  const deleteQuestions = (selected, links) => {
    setDoc(
      doc(db, "past_questions", selected.Department),
      {
        [selected.Level]: {
          [selected.Semester]: arrayRemove(...links),
        },
      },
      { merge: true }
    )
      .then(() => {
        console.log(
          "Successfully removed links from " +
            selected.Department +
            " document!"
        );
        setQuestions(questions.filter((question) => !links.includes(question)));
      })
      .catch((error) => console.log(error));
  };

  return (
    <QuestionsContext.Provider
      value={{
        questions,
        setQuestions,
        addNewQuestions,
        loadQuestions,
        deleteQuestions,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export default QuestionsContext;
