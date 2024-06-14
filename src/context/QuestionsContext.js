import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { createContext, useState } from "react";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

const QuestionsContext = createContext();

export const QuestionsContextProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [downloadUrls, setDownloadUrls] = useState([]);

  // *******

  const addFaculty = async (name) => {
    const facultyRef = await addDoc(collection(db, "faculty"), {
      name,
    });
    return facultyRef;
  };

  const addProgram = async (name, shortName, facultyId, numOfYears) => {
    const programRef = await addDoc(collection(db, "program"), {
      name,
      short_name: shortName,
      faculty_id: facultyId,
      num_of_years: numOfYears,
    });
    console.log("Program created with ID: ", programRef.id);
    return programRef;
  };

  const addCourse = async (name, programs, years, semesters) => {
    const courseRef = await addDoc(collection(db, "course"), {
      name,
      programs,
      years,
      semesters,
    });
    return courseRef;
  };

  const addPastQuestion = async (fileURL, courseId) => {
    const pastQuestionRef = await addDoc(collection(db, "past_question"), {
      url: fileURL,
      course_id: courseId,
    });
    return pastQuestionRef;
  };

  const uploadFile = async (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, `past_questions/${file.name}`);
    const fileUrl = await uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("Uploaded file: " + file.name + " successfully!");
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to upload file: ", file.name);
      });
    return fileUrl;
  };

  const loadPrograms = async () => {
    const querySnap = await getDocs(collection(db, "program"));
    return querySnap;
  };

  const loadFaculties = async () => {
    const querySnap = await getDocs(collection(db, "faculty"));
    return querySnap;
  };

  const loadProgramCourses = async (programId) => {
    const querySnap = await getDocs(
      collection(db, "course"),
      where("programs", "array-contains", programId)
    );

    const groupedCourses = {};
    querySnap.forEach((item) => {
      const data = item.data();
      data.programs.forEach((id, idx) => {
        if (id === programId) {
          const year = data.years[idx];
          const semester = data.semesters[idx];

          if (!groupedCourses[year]) {
            groupedCourses[year] = {};
          }

          if (!groupedCourses[year][semester]) {
            groupedCourses[year][semester] = [];
          }

          groupedCourses[year][semester].push({
            id: item.id,
            name: data.name,
            year: data.years[idx],
            semester: data.semesters[idx],
          });
        }
      });
    });

    return groupedCourses;
  };

  const loadPastQuestions = async (courseId) => {
    const querySnap = await getDocs(
      collection(db, "past_question"),
      where("course_id", "==", courseId)
    );
    return querySnap;
  };

  // *******************************************///

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
