import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "leaflet/dist/leaflet.css";

/* ================= PUBLIC ================= */
import HomePage from "./components/HomePage";
import Home from "./components/Home";
import AdminLogin from "./components/AdminLogin";
import UserLogin from "./components/UserLogin";
import UserRegister from "./components/UserRegister";

/* ================= USER ================= */
import Dashboard from "./pages/Dashboard";
import MapPage from "./pages/MapPage";
import SettingsPage from "./components/SettingsPage";
import SharePage from "./components/SharePage";
import ViewAllAlerts from "./components/ViewAllAlerts";

/* ================= DRIVER ================= */
import DriverPanel from "./pages/DriverPanel";

/* ================= ADMIN ================= */
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AddDriver from "./pages/AdminDashboard/AddDriver";
import UpdateDriver from "./pages/AdminDashboard/UpdateDriver";
import DriverList from "./pages/AdminDashboard/DriverList";
import AssignDriver from "./pages/AdminDashboard/AssignDriver";
import AddBus from "./pages/AdminDashboard/AddBus";
import ReportsAnalytics from "./pages/AdminDashboard/ReportsAnalytics";
import AdminProfile from "./pages/AdminDashboard/AdminProfile";

/* ================= UTILS ================= */
import LanguageSelection from "./components/LanguageSelection";
import SelectCityModal from "./components/SelectCityModal";

/* ================= GUARDS ================= */
import ProtectedRoute from "./utils/ProtectedRoute";
import AdminProtectedRoute from "./utils/AdminProtectedRoute";

/* ================= ANIMATED ROUTES ================= */
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        {/* ===== PUBLIC ===== */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-register" element={<UserRegister />} />

        {/* ===== USER ===== */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/map"
          element={
            <ProtectedRoute>
              <MapPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/share"
          element={
            <ProtectedRoute>
              <SharePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/alerts"
          element={
            <ProtectedRoute>
              <ViewAllAlerts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/setting-page"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />

        {/* ===== DRIVER (IMPORTANT FIX) ===== */}
        <Route
          path="/driver-panel"
          element={
            <ProtectedRoute>
              <DriverPanel />
            </ProtectedRoute>
          }
        />

        {/* ===== ADMIN ===== */}
        <Route
          path="/admin-dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/add-driver"
          element={
            <AdminProtectedRoute>
              <AddDriver />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/update-driver"
          element={
            <AdminProtectedRoute>
              <UpdateDriver />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/drivers-list"
          element={
            <AdminProtectedRoute>
              <DriverList />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/assign-driver"
          element={
            <AdminProtectedRoute>
              <AssignDriver />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/add-bus"
          element={
            <AdminProtectedRoute>
              <AddBus />
            </AdminProtectedRoute>
          }
        />
       
        <Route
          path="/reports"
          element={
            <AdminProtectedRoute>
              <ReportsAnalytics />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <AdminProtectedRoute>
              <AdminProfile />
            </AdminProtectedRoute>
          }
        />

        {/* ===== UTILS ===== */}
        <Route path="/language" element={<LanguageSelection />} />
        <Route path="/select-city" element={<SelectCityModal />} />

      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <Router>
    <AnimatedRoutes />
  </Router>
);

export default App;
