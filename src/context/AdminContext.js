import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useLocalStorage("isAdmin", false);
  const [isUser, setIsUser] = useState(false);

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        setIsAdmin,
        isUser,
        setIsUser,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
