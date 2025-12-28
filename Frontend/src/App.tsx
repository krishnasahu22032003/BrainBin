import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Landingpage from "./pages/landingpage";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import SharePage from "./pages/SharePage";

import { AuthProvider, useAuth } from "./Auth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: 1, staleTime: 60_000 },
    mutations: { retry: 0 },
  },
});

/* -------------------- Protected Route -------------------- */
const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <div className="p-6 text-center">Checking session…</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

/* -------------------- Public Only Route -------------------- */
/* Logged-in users should NOT see signin/signup again */
const PublicOnlyRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <div className="p-6 text-center">Checking session…</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* 🌐 Landing Page */}
            <Route path="/" element={<Landingpage />} />

            {/* 🔓 Auth Pages */}
            <Route
              path="/signin"
              element={
                <PublicOnlyRoute>
                  <AuthPage />
                </PublicOnlyRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicOnlyRoute>
                  <AuthPage />
                </PublicOnlyRoute>
              }
            />

            {/* 🔒 Protected Pages */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* 🔗 Public Share Page */}
            <Route path="/share/:shareId" element={<SharePage />} />

            {/* ❌ Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
