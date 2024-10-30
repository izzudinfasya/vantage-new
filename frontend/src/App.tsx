import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/homePage";
import LinktreePage from "./pages/linktreePage";
import PasswordPage from "./pages/passwordPage";
import CustomHeader from "./components/customHeader";
import CustomFooter from "./components/customFooter";
import DetailProduct from "./pages/detailproductPage";
import AdminUpload from "./pages/adminuploadPage";
import Loading from "./components/loading";

// Protected Route component to guard pages
const ProtectedRoute = ({
  isLoggedIn,
  children,
}: {
  isLoggedIn: boolean;
  children: React.ReactNode;
}) => {
  return isLoggedIn ? <>{children}</> : <Navigate to="/password" />;
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if user is logged in
  const [isLoading, setIsLoading] = useState(false); // State untuk loading
  const location = useLocation(); // Get current route location

  // Callback to log in user after entering correct password
  const handleLogin = (password: string) => {
    const correctPassword = "FIRSTDROP"; // Replace with your actual password logic
    if (password === correctPassword) {
      setIsLoggedIn(true); // Set login state to true
    }
  };

  // Effect untuk mendeteksi perubahan route
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location]);

  // Kondisi untuk menentukan kapan header/footer harus disembunyikan
  const hideHeaderFooter =
    location.pathname === "/password" || location.pathname === "/link";

  return (
    <div>
      {isLoading && <Loading isLoading={isLoading} />}{" "}
      {!hideHeaderFooter && <CustomHeader />}{" "}
      {/* Header tidak muncul di /password dan /link */}
      <Routes>
        {/* Route untuk LinktreePage tanpa header dan footer */}
        <Route path="/link" element={<LinktreePage />} />
        <Route path="/admin" element={<AdminUpload />} />

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
              <HomePage />
            </ProtectedRoute>
          }
        />

        {/* Protected route untuk DetailProduct */}
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <DetailProduct />
            </ProtectedRoute>
          }
        />

        {/* Redirect dari / ke /password jika belum login */}
        <Route path="/" element={<Navigate to="/password" />} />

        {/* Route untuk 404 Not Found */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      {!hideHeaderFooter && <CustomFooter />}{" "}
      {/* Footer tidak muncul di /password dan /link */}
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
