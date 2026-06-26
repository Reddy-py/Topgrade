import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import Login from "./pages/Login/Login";

import Dashboard from "./pages/Dashboard/Dashboard";
import Students from "./pages/Students/Students";
import Teachers from "./pages/Teachers/Teachers";
import Courses from "./pages/Courses/Courses";
import Attendance from "./pages/Attendance/Attendance";
import Fees from "./pages/Fees/Fees";
import Reports from "./pages/Reports/Reports";
import Settings from "./pages/Settings/Settings";

function App() {
  // Global Session Flag Tracker
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  return (
    <Routes>
      {/* 1. Explicitly isolate the standalone Login view outside the MainLayout shell */}
      <Route 
        path="/login" 
        element={
          isAuthenticated ? (
            <Navigate to="/" replace />
          ) : (
            <Login onLoginSuccess={() => setIsAuthenticated(true)} />
          )
        } 
      />

      {/* 2. Authenticated Core Wrapper Layer */}
      <Route 
        element={
          isAuthenticated ? (
            /* FIXED: Added the required onLogout prop here */
            <MainLayout onLogout={() => setIsAuthenticated(false)} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/fees" element={<Fees />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* 3. Fallback Route Wildcard */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
    </Routes>
  );
}

export default App;