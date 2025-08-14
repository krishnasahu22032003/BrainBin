import React, { useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";

type AuthMode = "signup" | "signin";

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md"
      >
        {/* Tabs */}
        <div className="flex mb-6 border-b">
          <button
            onClick={() => setMode("signup")}
            className={`flex-1 py-2 text-lg font-medium ${
              mode === "signup" ? "border-b-4 border-indigo-500" : ""
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setMode("signin")}
            className={`flex-1 py-2 text-lg font-medium ${
              mode === "signin" ? "border-b-4 border-indigo-500" : ""
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Form */}
        <motion.form
          key={mode}
          initial={{ opacity: 0, x: mode === "signup" ? 40 : -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password (Aa1234)"
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-indigo-600 text-white py-3 rounded-lg font-medium"
            disabled={mutation.isPending}
          >
            {mutation.isPending
              ? "Processing..."
              : mode === "signup"
              ? "Sign Up"
              : "Sign In"}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
}
