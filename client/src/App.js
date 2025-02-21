import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import SignUpPage from "./pages/SignUpPage";
import Settings from "./pages/Settings";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Redirect to login page by default */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>  
  );
};

export default App;
