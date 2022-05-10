import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserSignIn from "./pages/UserSignIn";
import UserRegistration from "./pages/UserRegistration";
import AccountRecovery from "./pages/AccountRecovery";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserSignIn />} />
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/forgot-password" element={<AccountRecovery />} />
      </Routes>
    </Router>
  );
}

export default App;
