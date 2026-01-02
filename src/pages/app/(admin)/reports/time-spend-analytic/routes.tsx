import { createFileRoute } from "@tanstack/react-router";
import TimeSpendAnalytic from "./index";

export const Route = createFileRoute(
  "/_authenticate/_app-layout/_require-admin/_admin-layout/reports/time-spend-analytic"
)({
  component: TimeSpendAnalytic,
});
