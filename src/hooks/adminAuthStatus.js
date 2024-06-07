import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    const checkAdminStats = async () => {
      if (isMounted) {
        const auth = getAuth();
        const usersRef = collection(db, "users");

        let q;

        onAuthStateChanged(auth, (user) => {
          if (!user) {
            setCheckingStatus(false);
            console.log("No user");
            return;
          }
          q = query(
            usersRef,
            where("email", "==", user.email),
            where("isAdmin", "==", true)
          );
        });
        const querySnap = await getDocs(q);

        if (querySnap.docs.length === 1) {
          console.log(querySnap);
          setIsAdmin(true) && setLoggedIn(true);
        } else {
          toast.error("You are not an administrator!");
        }
        setCheckingStatus(false);
      }
    };
    checkAdminStats();
    return () => (isMounted.current = false);
  }, [isMounted]);

  return { isAdmin, setIsAdmin, setLoggedIn, loggedIn, checkingStatus };
};
