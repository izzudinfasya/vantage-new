import React, { useState } from "react";
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
import UploadPage from "./pages/adminuploadPage";
import AdminPage from "./pages/adminPage";
import ProductPage from "./pages/productPage";
import Sidebar from "./components/sidebarAdmin"; // Import the Sidebar component
import Navbar from "./components/navbarAdmin"; // Import the Navbar component
import Marquee from "components/marquee";
import { Layout } from "antd";

const { Content } = Layout; // Destructure Content from Layout

// Protected Route component to guard pages
const ProtectedRoute = ({
  isLoggedIn,
  adminPasswordRequired = false,
  adminPassword = "",
  children,
}: {
  isLoggedIn: boolean;
  adminPasswordRequired?: boolean;
  adminPassword?: string;
  children: React.ReactNode;
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

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if user is logged in
  const [collapsed, setCollapsed] = useState(false); // State for sidebar collapse
  const [adminPassword, setAdminPassword] = useState(""); // State for admin password input
  const location = useLocation(); // Get current route location

  // Callback to log in user after entering correct password
  const handleLogin = (password: string) => {
    const userPassword = "FIRSTDROP"; // User password
    const adminPassword = "adminvntg"; // Admin password

    if (password === userPassword) {
      setIsLoggedIn(true);
    } else if (password === adminPassword) {
      setIsLoggedIn(true);
      setAdminPassword(password);
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

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
      <Route path="/" element={<Navigate to="/password" />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );

  const adminRoutes = [
    {
      path: "/admin",
      element: <AdminPage />,
    },
    {
      path: "/admin/product/settings",
      element: <UploadPage />,
    },
    {
      path: "/admin/product",
      element: <ProductPage />,
    },
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
                key={path} // Ensure to provide a unique key for each route
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
          <CustomHeader />
        </>
      )}
      {/* Render either the admin layout or non-admin routes based on the path */}
      {location.pathname.startsWith("/admin")
        ? renderAdminRoutes()
        : renderNonAdminRoutes()}
      {!hideHeaderFooter && <CustomFooter />}
    </>
  );
};

// Wrapper component for Router
const AppWrapper: React.FC = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
