import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserSignIn from "./pages/UserSignIn";
import UserRegistration from "./pages/UserRegistration";
import PasswordRecovery from "./pages/PasswordRecovery";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserSignIn />} />
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/forgot-password" element={<PasswordRecovery />} />
      </Routes>
    </Router>
  );
}

export default App;
