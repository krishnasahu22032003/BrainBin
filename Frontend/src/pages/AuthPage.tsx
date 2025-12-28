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

  const validPassword =
    password.length >= 5 &&
    password.length <= 50 &&
    /[A-Z]/.test(password);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden px-2 sm:px-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full bg-blue-400/20 blur-[200px]" />
        <div className="absolute bottom-0 right-1/4 h-[420px] w-[420px] rounded-full bg-indigo-400/15 blur-[200px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
          relative z-10 w-full max-w-md
          rounded-2xl bg-white
          border border-blue-100
          shadow-[0_30px_80px_-40px_rgba(37,99,235,0.35)]
          p-8 sm:p-6
        "
      >
        <h2 className="text-3xl font-bold text-center text-neutral-900 mb-6">
          {mode === "signup" ? "Create your account" : "Welcome back"}
        </h2>

        <div className="flex mb-6 rounded-xl bg-blue-50 p-1">
          {["signup", "signin"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m as AuthMode)}
              type="button"
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                mode === m
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-blue-600 hover:text-blue-800"
              }`}
            >
              {m === "signup" ? "Sign Up" : "Sign In"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-neutral-400" />
              <input
                type="email"
                placeholder="you@example.com"
                className="
                  w-full pl-10 p-3 rounded-lg
                  border border-neutral-300
                  bg-white text-neutral-900
                  placeholder-neutral-400
                  focus:ring-2 focus:ring-blue-500 focus:outline-none
                "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-neutral-400" />
              <input
                type="password"
                placeholder="••••••••"
                className={`w-full pl-10 p-3 rounded-lg border ${
                  validPassword ? "border-green-400" : "border-red-400"
                } bg-white text-neutral-900 placeholder-neutral-400 focus:ring-2 focus:outline-none ${
                  validPassword ? "focus:ring-green-500" : "focus:ring-red-500"
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {validPassword ? (
                <FaCheckCircle className="absolute right-3 top-3 text-green-500" />
              ) : (
                <FaTimesCircle className="absolute right-3 top-3 text-red-500" />
              )}
            </div>
            <p className="mt-1 text-xs text-neutral-500">
              Must include <span className="font-semibold">1 uppercase</span>,
              min <span className="font-semibold">5</span> chars.
            </p>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            className="
              relative w-full py-3 rounded-lg
              bg-gradient-to-r from-blue-600 to-indigo-600
              text-white font-semibold
              shadow-lg hover:shadow-xl transition-all cursor-pointer
            "
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
