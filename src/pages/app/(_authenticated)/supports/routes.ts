import { createFileRoute } from "@tanstack/react-router";
import Supports from ".";

export const Route = createFileRoute("/_authenticate/_app-layout/supports")({
  component: Supports,
});
