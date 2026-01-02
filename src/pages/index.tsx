import { tokenService } from "@/lib/utils/tokenServices";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    if (tokenService.getAccessToken()) {
      throw redirect({ to: "/dashboard", replace: true });
    }
    throw redirect({ to: "/login", replace: true });
  },
});
