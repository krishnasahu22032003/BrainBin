import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

type AuthMode = "signup" | "signin";

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const mutation = useMutation({
    mutationFn: async () => {
      const endpoint =
        mode === "signup"
          ? "http://localhost:3000/api/v1/signup"
          : "http://localhost:3000/api/v1/signin";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Request failed");
      return data;
    },
    onSuccess: (data) => {
      alert(`${mode === "signup" ? "Signup" : "Signin"} successful!`);
      console.log("Response:", data);

      // ✅ Save token to localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // ✅ Redirect after successful sign-in
      if (mode === "signin") {
        navigate("/dashboard", { replace: true });
      }
    },
    onError: (error: any) => {
      alert(error.message || "Something went wrong");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-100"
      >
        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          {mode === "signup" ? "Create your account" : "Welcome back"}
        </h2>
        <p className="text-gray-500 text-center mb-8 text-sm">
          {mode === "signup"
            ? "Join us and start your journey today."
            : "Sign in to continue to your dashboard."}
        </p>

        {/* Mode Switch */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setMode("signup")}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === "signup"
                ? "bg-white shadow-sm text-gray-900"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setMode("signin")}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === "signin"
                ? "bg-white shadow-sm text-gray-900"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full p-3 rounded-md border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-3 rounded-md border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            disabled={mutation.isPending}
            className="w-full py-3 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm transition"
          >
            {mutation.isPending
              ? "Processing..."
              : mode === "signup"
              ? "Sign Up"
              : "Sign In"}
          </motion.button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-gray-500">
          {mode === "signup" ? (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("signin")}
                className="text-indigo-600 hover:underline"
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("signup")}
                className="text-indigo-600 hover:underline"
              >
                Sign Up
              </button>
            </>
          )}
        </p>
      </motion.div>
    </div>
  );
}
