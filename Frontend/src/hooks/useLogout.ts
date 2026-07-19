import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ENV_SECRETS from "../lib/SECRETS";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const API = ENV_SECRETS.VITE_API_URL
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`${API}/api/v1/logout`, {
        method: "POST",
        credentials: "include", // send cookies
      });
      if (!res.ok) throw new Error("Logout failed");
      return res.json();
    },
    onSuccess: () => {
      // clear cached user
      queryClient.setQueryData(["me"], null);
      // redirect
      navigate("/signin");
    },
  });
}
