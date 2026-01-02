
import { createFileRoute } from "@tanstack/react-router";
import Dashboard from "./index";

export const Route = createFileRoute("/_authenticate/_app-layout/dashboard")({
  component: Dashboard,
});
