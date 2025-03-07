import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import AdminLogin from "./components/AdminLogin";
import ChallengePage from "./pages/ChallengePages";
import CompletePage from "./pages/CompletePage";
import FounderPage from "./pages/FounderPage";
import SubscriberPage from "./pages/SubscriberPage";
import AdminSignup from "./components/AdminSignup";

function App() {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<AdminSignup />} />
        <Route path="/login" element={<AdminLogin />} />

        {isAuthenticated ? (
          <Route path="/" element={<DashboardLayout/>}>
            <Route index element={<Navigate to="/challenges" />} />
            <Route path="challenges" element={<ChallengePage />} />
            <Route path="completed" element={<CompletePage />} />
            <Route path="founder" element={<FounderPage />} />
            <Route path="subscriber" element={<SubscriberPage />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
