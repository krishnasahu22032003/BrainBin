import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const res = await fetch("http://localhost:3000/api/v1/logout", {
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
