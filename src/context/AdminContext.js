import { createContext, useState } from "react";

const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
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
