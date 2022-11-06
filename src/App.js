import "./App.css";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/landingPage/LandingPage";
import { LoginPage } from "./pages/loginPage/LoginPage";
import { SignupPage } from "./pages/signupPage/SignupPage";
import { ForgotPasswordPage } from "./pages/forgotPasswordPage/ForgotPasswordPage";
import { ClientDashboard } from "./pages/clientDashboard/ClientDashboard";
import { LawyerDashboard } from "./pages/lawyerDashboard/LawyerDashboard";
import { AboutUsPage } from "./pages/aboutUsPage/AboutUsPage";
import { ContactUsPage } from "./pages/contactUsPage/ContactUsPage";

function App() {
  const isLoggedin = localStorage.getItem("isLoggedIn");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const u_role = userInfo?.u_role;
  console.log("isLoggedin", isLoggedin);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedin && isLoggedin === "true" ? (
            u_role && u_role === "client" ? (
              <ClientDashboard />
            ) : (
              <LawyerDashboard />
            )
          ) : (
            <LandingPage />
          )
        }
      />
      <Route path="/about-us" element={<AboutUsPage />} />
      <Route path="/contact-us" element={<ContactUsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/client-dashboard" element={<ClientDashboard />} />
      <Route path="/lawyer-dashboard" element={<LawyerDashboard />} />
    </Routes>
  );
}

export default App;
