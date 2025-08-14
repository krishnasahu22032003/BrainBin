import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // default: not logged in

  return (
    <Router>
      <Routes>
        {/* Auth pages */}
        <Route path="/signin" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />

        {/* Dashboard - only if logged in */}
        <Route
          path="/"
          element={
            isLoggedIn ? <Dashboard /> : <Navigate to="/signin" replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
