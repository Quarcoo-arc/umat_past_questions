import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserSignIn from "./pages/UserSignIn";
import UserRegistration from "./pages/UserRegistration";
import AccountRecovery from "./pages/AccountRecovery";
import PasswordReset from "./pages/PasswordReset";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserSignIn />} />
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/forgot-password" element={<AccountRecovery />} />
        <Route path="/password-reset" element={<PasswordReset />} />
      </Routes>
    </Router>
  );
}

export default App;
