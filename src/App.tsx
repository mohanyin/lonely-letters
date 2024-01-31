import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { routeTree } from "@/routeTree.gen";
import { useStore } from "@/store";
import { initializeDayjs } from "@/utils/date";

import "@/styles/globals.css";
import "@/styles/reset.css";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const router = createRouter({ routeTree });

initializeDayjs();
useStore.getState().init();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
