import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/homePage";
import LinktreePage from "./pages/linktreePage";
import PasswordPage from "./pages/passwordPage";
import CustomHeader from "./components/customHeader";
import CustomFooter from "./components/customFooter";

// Protected Route component to guard pages
const ProtectedRoute = ({
  isLoggedIn,
  children,
}: {
  isLoggedIn: boolean;
  children: React.ReactNode;
}) => {
  return isLoggedIn ? children : <Navigate to="/password" />;
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if user is logged in

  // Callback to log in user after entering correct password
  const handleLogin = (password: string) => {
    const correctPassword = "FIRSTDROP"; // Replace with your actual password logic
    if (password === correctPassword) {
      setIsLoggedIn(true); // Set login state to true
    }
  };

  return (
    <div>
      <Routes>
        {/* Route untuk LinktreePage tanpa header dan footer */}
        <Route path="/link" element={<LinktreePage />} />

        {/* Route untuk halaman password */}
        <Route
          path="/password"
          element={<PasswordPage onLogin={handleLogin} />}
        />

        {/* Protected route untuk HomePage, hanya bisa diakses jika sudah login */}
        <Route
          path="/home"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <CustomHeader />
              <HomePage />
              <CustomFooter />
            </ProtectedRoute>
          }
        />

        {/* Redirect dari / ke /password jika belum login */}
        <Route path="/" element={<Navigate to="/password" />} />

        {/* Route untuk 404 Not Found */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
};

// Komponen pembungkus untuk Router
const AppWrapper: React.FC = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
