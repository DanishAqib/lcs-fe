import "./App.css";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/landingPage/LandingPage";
import { LoginPage } from "./pages/loginPage/LoginPage";
import { SignupPage } from "./pages/signupPage/SignupPage";
import { ForgotPasswordPage } from "./pages/forgotPasswordPage/ForgotPasswordPage";
import { ClientDashboard } from "./pages/clientDashboard/ClientDashboard";
import { LawyerDashboard } from "./pages/lawyerDashboard/LawyerDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/client-dashboard" element={<ClientDashboard />} />
      <Route path="/lawyer-dashboard" element={<LawyerDashboard />} />
    </Routes>
  );
}

export default App;
