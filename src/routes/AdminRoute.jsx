import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/adminAuthStatus";
import { Spinner } from "../components/index";

const AdminRoute = () => {
  const { isAdmin, loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Spinner />;
  }

  return isAdmin && loggedIn ? <Outlet /> : <Navigate to="/admin" />;
};

export default AdminRoute;
