import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdminContextProvider } from "./context/AdminContext";
import {
  UserSignIn,
  AccountRecovery,
  AdminSignIn,
  PasswordReset,
  UserRegistration,
} from "./pages";
import LandingPage from "./pages/LandingPage/LandingPage";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import ViewQuestions from "./pages/ViewQuestions/ViewQuestions";
import AddQuestions from "./pages/AddQuestions/AddQuestions";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import PrivateRoute from "./routes/PrivateRoute";
import { QuestionsContextProvider } from "./context/QuestionsContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  return (
    <AdminContextProvider>
      <QuestionsContextProvider>
        <ToastContainer />
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/sign-in" element={<UserSignIn />} />
            <Route path="/register" element={<UserRegistration />} />
            <Route path="/forgot-password" element={<AccountRecovery />} />
            <Route path="/password-reset/:email" element={<PasswordReset />} />
            <Route path="/admin" element={<AdminSignIn />} />
            <Route path="/user-dashboard" element={<PrivateRoute />}>
              <Route path="/user-dashboard" element={<UserDashboard />} />
            </Route>
            <Route
              path="/view-questions/:level/:department/:semester"
              element={<PrivateRoute />}
            >
              <Route
                path="/view-questions/:level/:department/:semester"
                element={<ViewQuestions />}
              />
            </Route>
            <Route path="/add-questions" element={<AddQuestions />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </Router>
      </QuestionsContextProvider>
    </AdminContextProvider>
  );
}

export default App;
