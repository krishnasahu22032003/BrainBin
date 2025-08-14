import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// ——— Your pages ———
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";

/**
 * TanStack Query (React Query) quick recap:
 * - QueryClient: central cache/store for server state (API data)
 * - QueryClientProvider: makes the cache available to the app
 * - useQuery: for GETs (reads) with caching, refetch, staleTime, etc.
 * - useMutation: for POST/PUT/PATCH/DELETE (writes) with loading/error state
 * - invalidateQueries: refresh cached queries after a successful mutation
 */

// 1) Create a QueryClient with sensible defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Avoid too-chatty refetching by default; tune as you like
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60, // 1 min: data considered fresh for 60s
    },
    mutations: {
      retry: 0,
    },
  },
});

// 2) Minimal Auth context to guard routes and share login/logout
//    NOTE: We persist a token in localStorage (key: "bb_token").
//    Your AuthPage should call useAuth().login(tokenFromBackend) on success.

type AuthCtx = {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthCtx | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    Boolean(localStorage.getItem("bb_token"))
  );

  const login = (token: string) => {
    localStorage.setItem("bb_token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("bb_token");
    setIsAuthenticated(false);
  };

  // Optional: sync auth state if the token changes in another tab
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "bb_token") {
        setIsAuthenticated(Boolean(e.newValue));
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = useMemo(() => ({ isAuthenticated, login, logout }), [isAuthenticated]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3) ProtectedRoute blocks access when not authenticated
const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/signin" replace />;
  return children;
};

// 4) App shell: providers + routes
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Auth pages */}
            <Route path="/signin" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />

            {/* Main app (protected) */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Smart default: send users to the right place based on auth */}
            <Route
              path="/"
              element={
                <AuthGate />
              }
            />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>

      {/* Optional devtools for debugging query cache */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

// Redirect root to dashboard or signin depending on auth state
const AuthGate: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return <Navigate to={isAuthenticated ? "/dashboard" : "/signin"} replace />;
};

export default App;
