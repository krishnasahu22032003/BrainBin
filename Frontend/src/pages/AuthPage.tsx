// pages/AuthPage.tsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Auth";

type AuthMode = "signup" | "signin";
const API = "http://localhost:3000/api/v1";

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.pathname === "/signin") setMode("signin");
    if (location.pathname === "/signup") setMode("signup");
  }, [location.pathname]);

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard", { replace: true });
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const res = await fetch(`${API}/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.message || "Signup failed");
        alert(data.message || "Signup successful. Please sign in.");
        navigate("/signin", { replace: true });
      } else {
        await login(email, password); // sets cookie + refreshes session
        navigate("/dashboard", { replace: true });
      }
    } catch (err: any) {
      alert(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-100"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          {mode === "signup" ? "Create your account" : "Welcome back"}
        </h2>

        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setMode("signup")}
            type="button"
            className={`flex-1 py-2 rounded-md text-sm font-medium ${mode === "signup" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setMode("signin")}
            type="button"
            className={`flex-1 py-2 rounded-md text-sm font-medium ${mode === "signin" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}
          >
            Sign In
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full p-3 rounded-md border border-gray-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-3 rounded-md border border-gray-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            disabled={loading}
            className="w-full py-3 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
          >
            {loading ? "Processing..." : mode === "signup" ? "Sign Up" : "Sign In"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
