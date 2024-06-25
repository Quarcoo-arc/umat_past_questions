import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/adminAuthStatus";
import { Spinner } from "../components/index";
import { Layout } from "../HOC";

const AdminRoute = () => {
  const { isAdmin, loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Spinner />;
  }

  return isAdmin && loggedIn ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/admin" />
  );
};

export default AdminRoute;
