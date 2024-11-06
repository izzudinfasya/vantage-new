/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/shop/homePage";
import LinktreePage from "./pages/linktreePage";
import PasswordPage from "./pages/passwordPage";
import CustomHeader from "./components/header/customHeader";
import CustomFooter from "./components/footer/customFooter";
import DetailProduct from "./pages/shop/detailproductPage";
import UploadPage from "./pages/admin/adminuploadPage";
import AdminPage from "./pages/admin/adminPage";
import ProductPage from "./pages/admin/productPage";
import CheckoutPage from "./pages/shop/checkoutPage";
import Sidebar from "./components/admin/sidebarAdmin";
import Navbar from "./components/admin/navbarAdmin";
import Marquee from "components/marquee/marquee";
import { CartProvider } from "components/cartContext";
import { Layout } from "antd";
import WaitingListPage from "pages/admin/waitingListPage";

const { Content } = Layout;

interface ProtectedRouteProps {
  isLoggedIn: boolean;
  adminPasswordRequired?: boolean;
  adminPassword?: string;
  children: React.ReactNode;
}
// Utility function to generate a random user ID
const generateRandomUserId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Protected Route component to guard pages
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isLoggedIn,
  adminPasswordRequired = false,
  adminPassword = "",
  children,
}) => {
  const isAdminValid = adminPasswordRequired
    ? adminPassword === "adminvntg"
    : true;

  return isLoggedIn && isAdminValid ? (
    <>{children}</>
  ) : (
    <Navigate to="/password" />
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true"
  );
  const [collapsed, setCollapsed] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [userId, setUserId] = useState(
    () => localStorage.getItem("userId") || ""
  );
  const location = useLocation();

  useEffect(() => {
    const storedAdminPassword = localStorage.getItem("adminPassword");
    if (storedAdminPassword) {
      setAdminPassword(storedAdminPassword);
    }
  }, []);

  const handleLogin = (password: any) => {
    const userPassword = "FIRSTDROP";
    const adminPassword = "adminvntg";

    if (password === userPassword) {
      setIsLoggedIn(true);
      const newUserId = generateRandomUserId();
      setUserId(newUserId);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userId", newUserId);
    } else if (password === adminPassword) {
      setIsLoggedIn(true);
      setAdminPassword(password);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("adminPassword", password);
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  // Handle logout function
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    localStorage.removeItem("adminPassword");
    setIsLoggedIn(false);
    setUserId("");
    setAdminPassword("");
    window.location.href = "/password"; // Redirect to password page
  };

  // Session timeout logic
  useEffect(() => {
    const handleSessionTimeout = () => {
      const lastActivity = localStorage.getItem("lastActivity");
      if (lastActivity) {
        const now = Date.now();
        const thirtyMinutes = 30 * 60 * 1000; // 30 minutes
        if (now - parseInt(lastActivity) > thirtyMinutes) {
          handleLogout(); // Automatically logout if expired
        }
      }
    };

    const interval = setInterval(handleSessionTimeout, 1000 * 60); // Check every minute
    return () => clearInterval(interval); // Cleanup
  }, []);

  useEffect(() => {
    const updateLastActivity = () => {
      localStorage.setItem("lastActivity", Date.now().toString());
    };

    window.addEventListener("click", updateLastActivity);
    window.addEventListener("keydown", updateLastActivity);

    return () => {
      window.removeEventListener("click", updateLastActivity);
      window.removeEventListener("keydown", updateLastActivity);
    };
  }, []);

  // Condition to determine when to hide header/footer
  const hideHeaderFooter =
    location.pathname === "/password" ||
    location.pathname === "/link" ||
    location.pathname.startsWith("/admin");

  // Non-admin routes
  const renderNonAdminRoutes = () => (
    <Routes>
      <Route path="/link" element={<LinktreePage />} />
      <Route
        path="/password"
        element={<PasswordPage onLogin={handleLogin} />}
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/product/:id"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <DetailProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/password" />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );

  const adminRoutes = [
    { path: "/admin", element: <AdminPage /> },
    { path: "/admin/product/settings", element: <UploadPage /> },
    { path: "/admin/product", element: <ProductPage /> },
    { path: "/admin/waiting-list", element: <WaitingListPage /> },
    { path: "/admin/*", element: <h1>404 Not Found</h1> },
  ];

  // Admin routes with layout
  const renderAdminRoutes = () => (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed} />
      <Layout>
        <Navbar
          toggleSidebar={() => setCollapsed(!collapsed)}
          collapsed={false}
        />
        <Content style={{ padding: "24px" }}>
          <Routes>
            {adminRoutes.map(({ path, element }) => (
              <Route
                key={path}
                path={path}
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    adminPasswordRequired={true}
                    adminPassword={adminPassword}
                  >
                    {element}
                  </ProtectedRoute>
                }
              />
            ))}
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );

  return (
    <>
      {!hideHeaderFooter && (
        <>
          <Marquee />
          <CustomHeader onLogout={handleLogout} />
        </>
      )}
      {location.pathname.startsWith("/admin")
        ? renderAdminRoutes()
        : renderNonAdminRoutes()}
      {!hideHeaderFooter && <CustomFooter />}
    </>
  );
};

// Wrapper component for Router
const AppWrapper = () => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  return (
    <Router>
      <CartProvider userId={userId}>
        <App />
      </CartProvider>
    </Router>
  );
};

export default AppWrapper;
