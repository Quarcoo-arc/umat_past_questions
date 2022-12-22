import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdminContextProvider } from "./context/AdminContext";
import UserSignIn from "./pages/UserSignIn";
import UserRegistration from "./pages/UserRegistration";
import AccountRecovery from "./pages/AccountRecovery";
import PasswordReset from "./pages/PasswordReset";
import AdminSignIn from "./pages/AdminSignIn";
import LandingPage from "./pages/LandingPage/LandingPage";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import ViewQuestions from "./pages/ViewQuestions/ViewQuestions";
import AddQuestions from "./pages/AddQuestions/AddQuestions";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import PrivateRoute from "./routes/PrivateRoute";
import { QuestionsContextProvider } from "./context/QuestionsContext";

function App() {
  return (
    <AdminContextProvider>
      <QuestionsContextProvider>
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
