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

        onAuthStateChanged(auth, async (user) => {
          if (!user) {
            setCheckingStatus(false);
            setLoggedIn(false);
            setIsAdmin(false);
            return;
          }
          q = query(
            usersRef,
            where("email", "==", user.email),
            where("isAdmin", "==", true)
          );
          const querySnap = await getDocs(q);
          if (querySnap.docs.length === 1) {
            setIsAdmin(true);
            setLoggedIn(true);
            setCheckingStatus(false);
          } else {
            setCheckingStatus(false);
            toast.error("Unauthorised");
          }
        });
      }
    };
    checkAdminStats();
    return () => (isMounted.current = false);
  }, [isMounted]);

  return { isAdmin, setIsAdmin, setLoggedIn, loggedIn, checkingStatus };
};
