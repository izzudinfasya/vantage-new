import React from "react";
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

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        {/* Route untuk LinktreePage tanpa header dan footer */}
        <Route path="/link" element={<LinktreePage />} />

        {/* Redirect dari / ke /password */}
        <Route path="/" element={<Navigate to="/password" />} />

        {/* Route untuk PasswordPage */}
        <Route path="/password" element={<PasswordPage />} />

        {/* Route untuk HomePage dengan header dan footer */}
        <Route
          path="/home"
          element={
            <>
              <CustomHeader />
              <HomePage />
              <CustomFooter />
            </>
          }
        />

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
