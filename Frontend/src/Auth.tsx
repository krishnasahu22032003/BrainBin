// src/auth.tsx
import React, { createContext, useContext, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ENV_SECRETS from "./lib/SECRETS";

const API = ENV_SECRETS.VITE_API_URL;

type Session = { user: { _id: string; email: string } } | null;

type AuthCtx = {
  session: Session;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => void;
};

const AuthContext = createContext<AuthCtx | undefined>(undefined);
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const qc = useQueryClient();

  const { data, status } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await fetch(`${API}/api/v1/me`, { credentials: "include" });
      if (!res.ok) return null; 
      return (await res.json()) as { user: { _id: string; email: string } };
    },
    retry: false,
  });

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API}/api/v1/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", 
      body: JSON.stringify({ email, password }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(body.message || "Signin failed");
    await qc.invalidateQueries({ queryKey: ["me"] });
  };

  const logout = async () => {
    await fetch(`${API}/logout`, { method: "POST", credentials: "include" });
    await qc.invalidateQueries({ queryKey: ["me"] });
  };

  const refresh = () => qc.invalidateQueries({ queryKey: ["me"] });

  const value = useMemo<AuthCtx>(() => ({
    session: data ?? null,
    isAuthenticated: Boolean(data?.user),
    loading: status === "pending",
    login, logout, refresh,
  }), [data, status]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
