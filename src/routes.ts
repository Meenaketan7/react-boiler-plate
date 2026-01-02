import { index, layout, rootRoute, route } from "@tanstack/virtual-file-routes";

const middleware = (file: string, children: any[]) =>
  layout(`middlewares/${file}`, children);

export const routes = rootRoute("root.tsx", [
  // Landing/redirect logic
  index("index.tsx"),

  // Public auth-only pages guarded by redirect middleware
  middleware("restrict-login-signup.tsx", [
    route("/login", "auth/login/routes.ts"),
    route("/forgot-password", "auth/forgot-password/routes.ts"),
    route("/privacy-policy", "public/privacy-policy/routes.ts"),
  ]),

  // Protected area behind authentication
  middleware("authenticate.tsx", [
    layout("app-layout", "app/(_authenticated)/layout.tsx", [
      route("/dashboard", "app/(_authenticated)/dashboard/routes.ts"),
      route("/profile", "app/(_authenticated)/profile/routes.ts"),
      route("/supports", "app/(_authenticated)/supports/routes.ts"),
      route("/settings", "app/(_authenticated)/settings/routes.ts"),

      // Admin-only surface
      middleware("require-admin.tsx", [
        layout("admin-layout", "app/(admin)/layout.tsx", [
          route(
            "/reports/completion-ratio",
            "app/(admin)/reports/completion-ratio/routes.tsx"
          ),
          route(
            "/reports/time-spend-analytic",
            "app/(admin)/reports/time-spend-analytic/routes.tsx"
          ),
        ]),
      ]),
    ]),
  ]),

  // Error surfaces
  route("/403", "error/403/routes.ts"),
  route("/404", "error/404/routes.ts"),
  route("/500", "error/500/routes.ts"),
  route("/error", "error/default-error/routes.ts"),
]);
