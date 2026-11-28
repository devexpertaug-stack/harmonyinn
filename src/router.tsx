import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
      defaultPreloadStaleTime: 0,
    // Start loading a page as soon as a visitor hovers or touches its link, so the click itself
    // opens it straight away instead of waiting on the download.
    defaultPreload: "intent",
  });

  return router;
};
