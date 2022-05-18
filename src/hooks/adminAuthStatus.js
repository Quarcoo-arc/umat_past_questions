import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase.config";

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      const auth = getAuth();
      const usersRef = collection(db, "users");

      onAuthStateChanged(auth, (user) => {
        if (!user) {
          setCheckingStatus(false);
          return;
        }
        const q = query(
          usersRef,
          where("email", "==", user.email),
          where("isAdmin", "==", true)
        );
        const querySnap = async () => await getDocs(q);

        querySnap.docs.length === 1 && setLoggedIn(true) && setIsAdmin(true);
        setCheckingStatus(false);
      });
    }
    return () => (isMounted.current = false);
  }, [isMounted]);

  return { isAdmin, loggedIn, checkingStatus };
};
