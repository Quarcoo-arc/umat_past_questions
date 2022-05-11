import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserSignIn from "./pages/UserSignIn";
import UserRegistration from "./pages/UserRegistration";
import AccountRecovery from "./pages/AccountRecovery";
import PasswordReset from "./pages/PasswordReset";
import AdminSignIn from "./pages/AdminSignIn";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-in" element={<UserSignIn />} />
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/forgot-password" element={<AccountRecovery />} />
        <Route path="/password-reset/:email" element={<PasswordReset />} />
        <Route path="/admin" element={<AdminSignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
