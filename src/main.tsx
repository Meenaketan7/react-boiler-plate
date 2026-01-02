import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

import { Loader } from "./components";
import "./styles/global.css";
import { queryClient } from "./hooks";
import PageNotFound from "./pages/error/404";
import DefaultError from "./pages/error/default-error";
import { Toaster } from "./components/ui/sonner";

const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPendingComponent: () => (
    <div className="flex h-screen w-screen items-center justify-center bg-bunker-800">
      <Loader />
    </div>
  ),
  defaultNotFoundComponent: PageNotFound,
  defaultErrorComponent: DefaultError,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </StrictMode>
);
