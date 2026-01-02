import { createFileRoute } from "@tanstack/react-router";
import Settings from ".";

export const Route = createFileRoute("/_authenticate/_app-layout/settings")({
  component: Settings,
});
