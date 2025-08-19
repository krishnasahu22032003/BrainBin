import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Auth";
import { FaCheckCircle, FaTimesCircle, FaLock, FaEnvelope } from "react-icons/fa";

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
        await login(email, password);
        navigate("/dashboard", { replace: true });
      }
    } catch (err: any) {
      alert(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // password rules
  const validPassword =
    password.length >= 5 &&
    password.length <= 50 &&
    /[A-Z]/.test(password);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-[#0f4c75] overflow-hidden">
      {/* Background overlay */}
<div
  className="absolute inset-0 bg-cover bg-center opacity-90"
  style={{ backgroundImage: "url('/image/bg-img.jpg')" }}
></div>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs"></div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-2xl p-8"
      >
        <h2 className="text-3xl font-extrabold text-center text-white drop-shadow mb-6">
          {mode === "signup" ? "Create your account" : "Welcome back"}
        </h2>

        {/* Tabs */}
        <div className="flex mb-6 rounded-xl bg-white/10 p-1">
          {["signup", "signin"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m as AuthMode)}
              type="button"
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                mode === m
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {m === "signup" ? "Sign Up" : "Sign In"}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full pl-10 p-3 rounded-lg border border-gray-400/40 bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                placeholder="••••••••"
                className={`w-full pl-10 p-3 rounded-lg border ${
                  validPassword
                    ? "border-green-400"
                    : "border-red-400"
                } bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:outline-none ${
                  validPassword ? "focus:ring-green-500" : "focus:ring-red-500"
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {validPassword ? (
                <FaCheckCircle className="absolute right-3 top-3 text-green-400" />
              ) : (
                <FaTimesCircle className="absolute right-3 top-3 text-red-400" />
              )}
            </div>
            <p className="mt-1 text-xs text-gray-300">
              Must include <span className="text-white font-semibold">1 uppercase letter</span>, 
              min <span className="text-white font-semibold">5</span> chars, max <span className="text-white font-semibold">50</span>.
            </p>
          </div>

          {/* Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            className="relative w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all overflow-hidden"
          >
            {loading ? (
              <span className="animate-pulse">Processing...</span>
            ) : (
              <span>{mode === "signup" ? "Sign Up" : "Sign In"}</span>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
