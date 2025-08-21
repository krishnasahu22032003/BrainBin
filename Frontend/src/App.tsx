import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { AuthProvider, useAuth } from "./Auth";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import SharePage from "./pages/SharePage"; // 👈 import it

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: 1, staleTime: 60_000 },
    mutations: { retry: 0 },
  },
});

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { loading, isAuthenticated } = useAuth();
  if (loading) return <div className="p-6 text-center">Checking session…</div>;
  if (!isAuthenticated) return <Navigate to="/signin" replace />;
  return children;
};

const AuthGate: React.FC = () => {
  const { loading, isAuthenticated } = useAuth();
  if (loading) return <div className="p-6 text-center">Checking session…</div>;
  return <Navigate to={isAuthenticated ? "/dashboard" : "/signin"} replace />;
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/signin" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* 👇 Public share route */}
            <Route path="/share/:shareId" element={<SharePage />} />

            <Route path="/" element={<AuthGate />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
