import { createFileRoute } from "@tanstack/react-router";
import CompletionRatio from "./index";

export const Route = createFileRoute(
  "/_authenticate/_app-layout/_require-admin/_admin-layout/reports/completion-ratio"
)({
  component: CompletionRatio,
});
