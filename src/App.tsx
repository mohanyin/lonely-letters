import { RouterProvider, createRouter } from "@tanstack/react-router";
import mixpanel from "mixpanel-browser";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { register as registerSwiper } from "swiper/element/bundle";

import { routeTree } from "@/routeTree.gen";
import { useStore } from "@/store";
import globals, { reset } from "@/styles/globals";
import { initializeDayjs } from "@/utils/date";

import "swiper/css";

const MIXPANEL_TOKEN = "475ae7127533e42b069b8a9debf6e538";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const router = createRouter({ routeTree });

initializeDayjs();
useStore.getState().init();
registerSwiper();
mixpanel.init(MIXPANEL_TOKEN, {
  debug: import.meta.env.DEV,
  track_pageview: true,
  persistence: "localStorage",
  ignore_dnt: true,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className={[globals, reset].join(" ")} />
    <RouterProvider router={router} />
  </StrictMode>,
);
